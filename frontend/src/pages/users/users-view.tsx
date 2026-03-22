import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/users/usersSlice'
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


const UsersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { users } = useAppSelector((state) => state.users)
    
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
              <title>{getPageTitle('View users')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View users')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/users/users-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>First Name</p>
                    <p>{users?.firstName}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Last Name</p>
                    <p>{users?.lastName}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Phone Number</p>
                    <p>{users?.phoneNumber}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>E-Mail</p>
                    <p>{users?.email}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='Disabled'>
                    <SwitchField
                      field={{name: 'disabled', value: users?.disabled}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Avatar</p>
                    {users?.avatar?.length
                      ? (
                        <ImageField
                          name={'avatar'}
                          image={users?.avatar}
                          className='w-20 h-20'
                        />
                      ) : <p>No Avatar</p>
                    }
                </div>
              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>App Role</p>
                    
                    
                    
                    
                        <p>{users?.app_role?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              
                <>
                    <p className={'block font-bold mb-2'}>Custom Permissions</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                    <th>Name</th>
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {users.custom_permissions && Array.isArray(users.custom_permissions) &&
                              users.custom_permissions.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/permissions/permissions-view/?id=${item.id}`)}>
                                  
                                    
                                    
                                  
                                    
                                    <td data-label="name">
                                        { item.name }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.custom_permissions?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Organizations</p>
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{users?.organizations?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Cases Owner</p>
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
                            {users.cases_owner_user && Array.isArray(users.cases_owner_user) &&
                              users.cases_owner_user.map((item: any) => (
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
                        {!users?.cases_owner_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Tasks Assignee</p>
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
                            {users.tasks_assignee_user && Array.isArray(users.tasks_assignee_user) &&
                              users.tasks_assignee_user.map((item: any) => (
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
                        {!users?.tasks_assignee_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Documents UploadedBy</p>
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
                            {users.documents_uploaded_by_user && Array.isArray(users.documents_uploaded_by_user) &&
                              users.documents_uploaded_by_user.map((item: any) => (
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
                        {!users?.documents_uploaded_by_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Appeal_drafts Author</p>
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
                            {users.appeal_drafts_author_user && Array.isArray(users.appeal_drafts_author_user) &&
                              users.appeal_drafts_author_user.map((item: any) => (
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
                        {!users?.appeal_drafts_author_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Notes Author</p>
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
                            {users.notes_author_user && Array.isArray(users.notes_author_user) &&
                              users.notes_author_user.map((item: any) => (
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
                        {!users?.notes_author_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Activity_logs Actor</p>
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
                            {users.activity_logs_actor_user && Array.isArray(users.activity_logs_actor_user) &&
                              users.activity_logs_actor_user.map((item: any) => (
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
                        {!users?.activity_logs_actor_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/users/users-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

UsersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_USERS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default UsersView;