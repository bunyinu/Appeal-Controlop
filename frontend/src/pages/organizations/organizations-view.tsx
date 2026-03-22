import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/organizations/organizationsSlice'
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


const OrganizationsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { organizations } = useAppSelector((state) => state.organizations)
    
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
              <title>{getPageTitle('View organizations')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View organizations')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/organizations/organizations-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{organizations?.name}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

                
                <>
                    <p className={'block font-bold mb-2'}>Users Organizations</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                <th>First Name</th>
                                
                                
                                
                                <th>Last Name</th>
                                
                                
                                
                                <th>Phone Number</th>
                                
                                
                                
                                <th>E-Mail</th>
                                
                                
                                
                                <th>Disabled</th>
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {organizations.users_organizations && Array.isArray(organizations.users_organizations) &&
                              organizations.users_organizations.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/users/users-view/?id=${item.id}`)}>
                                    
                                    
                                    <td data-label="firstName">
                                        { item.firstName }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="lastName">
                                        { item.lastName }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="phoneNumber">
                                        { item.phoneNumber }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="email">
                                        { item.email }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="disabled">
                                        { dataFormatter.booleanFormatter(item.disabled) }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!organizations?.users_organizations?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Payers Organization</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                <th>Name</th>
                                
                                
                                
                                <th>PayerCode</th>
                                
                                
                                
                                <th>PlanType</th>
                                
                                
                                
                                <th>ClaimsAddress</th>
                                
                                
                                
                                <th>FaxNumber</th>
                                
                                
                                
                                <th>PortalURL</th>
                                
                                
                                
                                <th>AppealsSubmissionMethod</th>
                                
                                
                                
                                <th>AppealsContact</th>
                                
                                
                                
                                <th>IsActive</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {organizations.payers_organization && Array.isArray(organizations.payers_organization) &&
                              organizations.payers_organization.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/payers/payers-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    <td data-label="name">
                                        { item.name }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="payer_code">
                                        { item.payer_code }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="plan_type">
                                        { item.plan_type }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="claims_address">
                                        { item.claims_address }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="fax_number">
                                        { item.fax_number }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="portal_url">
                                        { item.portal_url }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="appeals_submission_method">
                                        { item.appeals_submission_method }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="appeals_contact">
                                        { item.appeals_contact }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="is_active">
                                        { dataFormatter.booleanFormatter(item.is_active) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!organizations?.payers_organization?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Cases Organization</p>
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
                            {organizations.cases_organization && Array.isArray(organizations.cases_organization) &&
                              organizations.cases_organization.map((item: any) => (
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
                        {!organizations?.cases_organization?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Tasks Organization</p>
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
                            {organizations.tasks_organization && Array.isArray(organizations.tasks_organization) &&
                              organizations.tasks_organization.map((item: any) => (
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
                        {!organizations?.tasks_organization?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Documents Organization</p>
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
                            {organizations.documents_organization && Array.isArray(organizations.documents_organization) &&
                              organizations.documents_organization.map((item: any) => (
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
                        {!organizations?.documents_organization?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Appeal_drafts Organization</p>
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
                            {organizations.appeal_drafts_organization && Array.isArray(organizations.appeal_drafts_organization) &&
                              organizations.appeal_drafts_organization.map((item: any) => (
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
                        {!organizations?.appeal_drafts_organization?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Notes Organization</p>
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
                            {organizations.notes_organization && Array.isArray(organizations.notes_organization) &&
                              organizations.notes_organization.map((item: any) => (
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
                        {!organizations?.notes_organization?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Activity_logs Organization</p>
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
                            {organizations.activity_logs_organization && Array.isArray(organizations.activity_logs_organization) &&
                              organizations.activity_logs_organization.map((item: any) => (
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
                        {!organizations?.activity_logs_organization?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Settings Organization</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                <th>Key</th>
                                
                                
                                
                                <th>Value</th>
                                
                                
                                
                                <th>Description</th>
                                
                                
                                
                                <th>ValueType</th>
                                
                                
                                
                                <th>IsSensitive</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {organizations.settings_organization && Array.isArray(organizations.settings_organization) &&
                              organizations.settings_organization.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/settings/settings-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    <td data-label="key">
                                        { item.key }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="value">
                                        { item.value }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="description">
                                        { item.description }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="value_type">
                                        { item.value_type }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="is_sensitive">
                                        { dataFormatter.booleanFormatter(item.is_sensitive) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!organizations?.settings_organization?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/organizations/organizations-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

OrganizationsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_ORGANIZATIONS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default OrganizationsView;