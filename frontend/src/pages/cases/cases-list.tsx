import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'
import TableCases from '../../components/Cases/TableCases'
import BaseButton from '../../components/BaseButton'
import axios from "axios";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import CardBoxModal from "../../components/CardBoxModal";
import DragDropFilePicker from "../../components/DragDropFilePicker";
import {setRefetch, uploadCsv} from '../../stores/cases/casesSlice';


import {hasPermission} from "../../helpers/userPermissions";



const CasesTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [showTableView, setShowTableView] = useState(false);

  
  const { currentUser } = useAppSelector((state) => state.auth);
  

  const dispatch = useAppDispatch();


  const [filters] = useState([{label: 'CaseNumber', title: 'case_number'},{label: 'PatientName', title: 'patient_name'},{label: 'MemberID', title: 'member_id'},{label: 'ProcedureCode', title: 'procedure_code'},{label: 'DiagnosisCode', title: 'diagnosis_code'},{label: 'DenialReasonCode', title: 'denial_reason_code'},{label: 'DenialReason', title: 'denial_reason'},{label: 'FacilityName', title: 'facility_name'},{label: 'OrderingProvider', title: 'ordering_provider'},
          
          {label: 'AmountatRisk', title: 'amount_at_risk', number: 'true'},
          {label: 'PatientDateofBirth', title: 'patient_dob', date: 'true'},{label: 'SubmittedAt', title: 'submitted_at', date: 'true'},{label: 'DueAt', title: 'due_at', date: 'true'},{label: 'ClosedAt', title: 'closed_at', date: 'true'},
    
    
    
    
    {label: 'Payer', title: 'payer'},
    
    
    
    {label: 'Owner', title: 'owner_user'},
    
    
          
          {label: 'Status', title: 'status', type: 'enum', options: ['intake','triage','evidence_needed','appeal_ready','submitted','pending_payer','won','lost']},{label: 'Priority', title: 'priority', type: 'enum', options: ['low','medium','high','urgent']},{label: 'Outcome', title: 'outcome', type: 'enum', options: ['unknown','won','lost','partially_won','withdrawn']},
  ]);
    
    const hasCreatePermission = currentUser && hasPermission(currentUser, 'CREATE_CASES');
    

    
    const handleCustomFilter = (field, value) => {
        setFilterItems(prev => {
            const filtered = prev.filter(item => item.fields.selectedField !== field);
            if (value) {
                filtered.push({ id: field, fields: { selectedField: field, filterValue: value } });
            }
            return filtered;
        });
    };
    
    const handleCustomFilterFromTo = (field, value) => {
        setFilterItems(prev => {
            const filtered = prev.filter(item => item.fields.selectedField !== field);
            if (value) {
                filtered.push({ id: field, fields: { selectedField: field, filterValueFrom: value + 'T00:00', filterValueTo: value + 'T23:59' } });
            }
            return filtered;
        });
    };


    const addFilter = () => {
        const newItem = {
            id: uniqueId(),
            fields: {
                filterValue: '',
                filterValueFrom: '',
                filterValueTo: '',
                selectedField: '',
            },
        };
        newItem.fields.selectedField = filters[0].title;
        setFilterItems([...filterItems, newItem]);
    };

    const getCasesCSV = async () => {
        const response = await axios({url: '/cases?filetype=csv', method: 'GET',responseType: 'blob'});
        const type = response.headers['content-type']
        const blob = new Blob([response.data], { type: type })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'casesCSV.csv'
        link.click()
    };

    const onModalConfirm = async () => {
        if (!csvFile) return;
        await dispatch(uploadCsv(csvFile));
        dispatch(setRefetch(true));
        setCsvFile(null);
        setIsModalActive(false);
    };

    const onModalCancel = () => {
        setCsvFile(null);
        setIsModalActive(false);
    };

  return (
    <>
      <Head>
        <title>{getPageTitle('Cases')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Cases" main>
        {''}
        </SectionTitleLineWithButton>
        
        <CardBox className='mb-6'>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                    <label className="block text-sm font-bold mb-1">Status</label>
                    <select className="w-full border rounded p-2 text-black" onChange={(e) => handleCustomFilter('status', e.target.value)}>
                        <option value="">All</option>
                        <option value="intake">Intake</option>
                        <option value="triage">Triage</option>
                        <option value="evidence_needed">Evidence Needed</option>
                        <option value="appeal_ready">Appeal Ready</option>
                        <option value="submitted">Submitted</option>
                        <option value="pending_payer">Pending Payer</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Priority</label>
                    <select className="w-full border rounded p-2 text-black" onChange={(e) => handleCustomFilter('priority', e.target.value)}>
                        <option value="">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Search Case #</label>
                    <input type="text" className="w-full border rounded p-2 text-black" placeholder="Search..." onChange={(e) => handleCustomFilter('case_number', e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Search Patient</label>
                    <input type="text" className="w-full border rounded p-2 text-black" placeholder="Search..." onChange={(e) => handleCustomFilter('patient_name', e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Due Date</label>
                    <input type="date" className="w-full border rounded p-2 text-black" onChange={(e) => handleCustomFilterFromTo('due_at', e.target.value)} />
                </div>
            </div>
        </CardBox>

        <CardBox   className='mb-6' cardBoxClassName='flex flex-wrap'>
          
            {hasCreatePermission && <BaseButton className={'mr-3'} href={'/cases/cases-new'} color='info' label='New Item'/>}
          
          <BaseButton
              className={'mr-3'}
              color='info'
              label='Filter'
              onClick={addFilter}
          />
          <BaseButton className={'mr-3'} color='info' label='Download CSV' onClick={getCasesCSV} />
          
            {hasCreatePermission && (
              <BaseButton
                color='info'
                label='Upload CSV'
                onClick={() => setIsModalActive(true)}
              />
            )}
          
          <div className='md:inline-flex items-center ms-auto'>
            <div id='delete-rows-button'></div>
          </div>  
          
            <div className='md:inline-flex items-center ms-auto'>
              <Link href={'/cases/cases-table'}>Switch to Table</Link>
            </div>
          
        </CardBox>
        
          <TableCases
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
            showGrid={false}
          />
        
      </SectionMain>
      <CardBoxModal
          title='Upload CSV'
          buttonColor='info'
          buttonLabel={'Confirm'}
        // buttonLabel={false ? 'Deleting...' : 'Confirm'}
          isActive={isModalActive}
          onConfirm={onModalConfirm}
          onCancel={onModalCancel}
      >
          <DragDropFilePicker
              file={csvFile}
              setFile={setCsvFile}
              formats={'.csv'}
          />
      </CardBoxModal>
    </>
  )
}

CasesTablesPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
        permission={'READ_CASES'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default CasesTablesPage
