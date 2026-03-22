import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/cases/casesSlice'
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


const CasesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { cases } = useAppSelector((state) => state.cases)
    
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
              <title>{getPageTitle('View cases')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View cases')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/cases/cases-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
                {hasPermission(currentUser, 'READ_ORGANIZATIONS') && 
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Organization</p>
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{cases?.organization?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                  } 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Payer</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{cases?.payer?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Owner</p>
                    
                    
                        <p>{cases?.owner_user?.firstName ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>CaseNumber</p>
                    <p>{cases?.case_number}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>PatientName</p>
                    <p>{cases?.patient_name}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='PatientDateofBirth'>
                    {cases.patient_dob ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={cases.patient_dob ?
                        new Date(
                          dayjs(cases.patient_dob).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No PatientDateofBirth</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>MemberID</p>
                    <p>{cases?.member_id}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>ProcedureCode</p>
                    <p>{cases?.procedure_code}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>DiagnosisCode</p>
                    <p>{cases?.diagnosis_code}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>DenialReasonCode</p>
                    <p>{cases?.denial_reason_code}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={cases?.denial_reason} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>FacilityName</p>
                    <p>{cases?.facility_name}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>OrderingProvider</p>
                    <p>{cases?.ordering_provider}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>AmountatRisk</p>
                  <p>{cases?.amount_at_risk || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Status</p>
                    <p>{cases?.status ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Priority</p>
                    <p>{cases?.priority ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='SubmittedAt'>
                    {cases.submitted_at ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={cases.submitted_at ?
                        new Date(
                          dayjs(cases.submitted_at).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No SubmittedAt</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='DueAt'>
                    {cases.due_at ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={cases.due_at ?
                        new Date(
                          dayjs(cases.due_at).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No DueAt</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='ClosedAt'>
                    {cases.closed_at ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={cases.closed_at ?
                        new Date(
                          dayjs(cases.closed_at).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No ClosedAt</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Outcome</p>
                    <p>{cases?.outcome ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

                
                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Tasks Case</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                
                                
                                
                                <th>Title</th>
                                
                                
                                
                                <th>Description</th>
                                
                                
                                
                                <th>Status</th>
                                
                                
                                
                                <th>Priority</th>
                                
                                
                                
                                <th>DueAt</th>
                                
                                
                                
                                <th>CompletedAt</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {cases.tasks_case && Array.isArray(cases.tasks_case) &&
                              cases.tasks_case.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/tasks/tasks-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="title">
                                        { item.title }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="description">
                                        { item.description }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="status">
                                        { item.status }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="priority">
                                        { item.priority }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="due_at">
                                        { dataFormatter.dateTimeFormatter(item.due_at) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="completed_at">
                                        { dataFormatter.dateTimeFormatter(item.completed_at) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!cases?.tasks_case?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Documents Case</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                
                                
                                
                                <th>Category</th>
                                
                                
                                
                                <th>Title</th>
                                
                                
                                
                                <th>Description</th>
                                
                                
                                
                                
                                
                                <th>IsConfidential</th>
                                
                                
                                
                                <th>ReceivedAt</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {cases.documents_case && Array.isArray(cases.documents_case) &&
                              cases.documents_case.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/documents/documents-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="category">
                                        { item.category }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="title">
                                        { item.title }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="description">
                                        { item.description }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="is_confidential">
                                        { dataFormatter.booleanFormatter(item.is_confidential) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="received_at">
                                        { dataFormatter.dateTimeFormatter(item.received_at) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!cases?.documents_case?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Appeal_drafts Case</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                
                                
                                
                                <th>Title</th>
                                
                                
                                
                                <th>Status</th>
                                
                                
                                
                                
                                
                                
                                
                                <th>SubmittedAt</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {cases.appeal_drafts_case && Array.isArray(cases.appeal_drafts_case) &&
                              cases.appeal_drafts_case.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/appeal_drafts/appeal_drafts-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="title">
                                        { item.title }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="status">
                                        { item.status }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="submitted_at">
                                        { dataFormatter.dateTimeFormatter(item.submitted_at) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!cases?.appeal_drafts_case?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Notes Case</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                
                                
                                
                                <th>Title</th>
                                
                                
                                
                                
                                
                                <th>IsPrivate</th>
                                
                                
                                
                                <th>NoteType</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {cases.notes_case && Array.isArray(cases.notes_case) &&
                              cases.notes_case.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/notes/notes-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="title">
                                        { item.title }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="is_private">
                                        { dataFormatter.booleanFormatter(item.is_private) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="note_type">
                                        { item.note_type }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!cases?.notes_case?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Activity_logs Case</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                
                                
                                
                                <th>EntityType</th>
                                
                                
                                
                                <th>EntityKey</th>
                                
                                
                                
                                <th>Action</th>
                                
                                
                                
                                <th>Message</th>
                                
                                
                                
                                <th>OccurredAt</th>
                                
                                
                                
                                <th>IPAddress</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {cases.activity_logs_case && Array.isArray(cases.activity_logs_case) &&
                              cases.activity_logs_case.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/activity_logs/activity_logs-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="entity_type">
                                        { item.entity_type }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="entity_key">
                                        { item.entity_key }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="action">
                                        { item.action }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="message">
                                        { item.message }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="occurred_at">
                                        { dataFormatter.dateTimeFormatter(item.occurred_at) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="ip_address">
                                        { item.ip_address }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!cases?.activity_logs_case?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/cases/cases-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

CasesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_CASES'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default CasesView;