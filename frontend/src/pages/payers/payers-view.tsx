import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/payers/payersSlice'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

import {hasPermission} from "../../helpers/userPermissions";


const PayersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { payers } = useAppSelector((state) => state.payers)
    
    const { currentUser } = useAppSelector((state) => state.auth);
    

    const { id } = router.query;
    
    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);


    return (
      <>
          <Head>
              <title>{getPageTitle('View payers')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View payers')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/payers/payers-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
                {hasPermission(currentUser, 'READ_ORGANIZATIONS') && 
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Organization</p>
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{payers?.organization?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                  } 
              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{payers?.name}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>PayerCode</p>
                    <p>{payers?.payer_code}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>PlanType</p>
                    <p>{payers?.plan_type}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={payers?.claims_address} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>FaxNumber</p>
                    <p>{payers?.fax_number}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>PortalURL</p>
                    <p>{payers?.portal_url}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>AppealsSubmissionMethod</p>
                    <p>{payers?.appeals_submission_method}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={payers?.appeals_contact} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='IsActive'>
                    <SwitchField
                      field={{name: 'is_active', value: payers?.is_active}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Cases Payer</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                
                                
                                
                                <th>CaseNumber</th>
                                
                                
                                
                                <th>PatientName</th>
                                
                                
                                
                                <th>PatientDateofBirth</th>
                                
                                
                                
                                <th>MemberID</th>
                                
                                
                                
                                <th>ProcedureCode</th>
                                
                                
                                
                                <th>DiagnosisCode</th>
                                
                                
                                
                                <th>DenialReasonCode</th>
                                
                                
                                
                                <th>DenialReason</th>
                                
                                
                                
                                <th>FacilityName</th>
                                
                                
                                
                                <th>OrderingProvider</th>
                                
                                
                                
                                <th>AmountatRisk</th>
                                
                                
                                
                                <th>Status</th>
                                
                                
                                
                                <th>Priority</th>
                                
                                
                                
                                <th>SubmittedAt</th>
                                
                                
                                
                                <th>DueAt</th>
                                
                                
                                
                                <th>ClosedAt</th>
                                
                                
                                
                                <th>Outcome</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {payers.cases_payer && Array.isArray(payers.cases_payer) &&
                              payers.cases_payer.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/cases/cases-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="case_number">
                                        { item.case_number }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="patient_name">
                                        { item.patient_name }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="patient_dob">
                                        { dataFormatter.dateTimeFormatter(item.patient_dob) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="member_id">
                                        { item.member_id }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="procedure_code">
                                        { item.procedure_code }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="diagnosis_code">
                                        { item.diagnosis_code }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="denial_reason_code">
                                        { item.denial_reason_code }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="denial_reason">
                                        { item.denial_reason }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="facility_name">
                                        { item.facility_name }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="ordering_provider">
                                        { item.ordering_provider }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="amount_at_risk">
                                        { item.amount_at_risk }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="status">
                                        { item.status }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="priority">
                                        { item.priority }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="submitted_at">
                                        { dataFormatter.dateTimeFormatter(item.submitted_at) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="due_at">
                                        { dataFormatter.dateTimeFormatter(item.due_at) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="closed_at">
                                        { dataFormatter.dateTimeFormatter(item.closed_at) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="outcome">
                                        { item.outcome }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!payers?.cases_payer?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/payers/payers-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

PayersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_PAYERS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default PayersView;