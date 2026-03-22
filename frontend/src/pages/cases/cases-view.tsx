import React, { useEffect, useState, ReactElement } from 'react';
import Head from 'next/head'
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { fetch as fetchCase, update as updateCase } from '../../stores/cases/casesSlice';
import LayoutAuthenticated from "../../layouts/Authenticated";
import { getPageTitle } from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import CardBoxModal from "../../components/CardBoxModal";
import FormField from "../../components/FormField";
import { Field, Form, Formik } from "formik";
import axios from "axios";


import { mdiChartTimelineVariant, mdiFormatListChecks, mdiFileDocument, mdiFileDocumentEdit, mdiNoteText, mdiHistory } from "@mdi/js";

import TableTasks from '../../components/Tasks/TableTasks';
import TableDocuments from '../../components/Documents/TableDocuments';
import TableAppealDrafts from '../../components/Appeal_drafts/TableAppeal_drafts';
import TableNotes from '../../components/Notes/TableNotes';
import TableActivityLogs from '../../components/Activity_logs/TableActivity_logs';

const CasesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { cases, loading } = useAppSelector((state) => state.cases)
    const { currentUser } = useAppSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState('overview');

    
    const [modalAction, setModalAction] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    const handleActionSubmit = async (values) => {
        setActionLoading(true);
        try {
            if (modalAction === 'markWon') {
                await axios.put("/cases/${id}/mark-won", { data: { resolutionReason: values.reason } });
            } else if (modalAction === 'markLost') {
                await axios.put("/cases/${id}/mark-lost", { data: { resolutionReason: values.reason } });
            } else if (modalAction === 'reopen') {
                await axios.put("/cases/${id}/reopen", { data: { reopenReason: values.reason } });
            } else if (modalAction === 'changeStatus') {
                await axios.put("/cases/${id}/change-status", { data: { status: values.status } });
            }
            dispatch(fetchCase({ id }));
            setModalAction(null);
        } catch (e) {
            console.error(e);
            alert('Action failed: ' + (e.response?.data?.message || e.message));
        } finally {
            setActionLoading(false);
        }
    };

    
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            dispatch(fetchCase({ id }));
        }
    }, [dispatch, id]);

    if (!cases || loading) return <div>Loading...</div>;

    const tabs = [
        { id: 'overview', label: 'Overview', icon: mdiChartTimelineVariant },
        { id: 'tasks', label: 'Tasks', icon: mdiFormatListChecks },
        { id: 'documents', label: 'Documents', icon: mdiFileDocument },
        { id: 'drafts', label: 'Appeal Drafts', icon: mdiFileDocumentEdit },
        { id: 'notes', label: 'Notes', icon: mdiNoteText },
        { id: 'activity', label: 'Activity', icon: mdiHistory },
    ];

    const generateFixedFilter = (field, value) => {
       return [{ id: 'fixed', fields: { selectedField: field, filterValue: value } }];
    };

    return (
      <>
          <Head>
              <title>{getPageTitle('Case Details')}</title>
          </Head>
          <SectionMain>

          <CardBoxModal
            isActive={!!modalAction}
            title={modalAction === 'markWon' ? 'Mark Case Won' : modalAction === 'markLost' ? 'Mark Case Lost' : modalAction === 'reopen' ? 'Reopen Case' : modalAction === 'changeStatus' ? 'Change Status' : ''}
            buttonColor={modalAction === 'markWon' ? 'success' : modalAction === 'markLost' ? 'danger' : 'info'}
            buttonLabel="Confirm"
            onCancel={() => setModalAction(null)}
            onConfirm={() => {
                const form = document.getElementById('action-form');
                if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }}
          >
            <Formik
              initialValues={{ reason: '', status: cases.status }}
              onSubmit={handleActionSubmit}
            >
              <Form id="action-form">
                {['markWon', 'markLost', 'reopen'].includes(modalAction) && (
                    <FormField label="Reason (Required)">
                      <Field name="reason" as="textarea" className="w-full border-gray-300 rounded p-2" rows="3" required />
                    </FormField>
                )}
                {modalAction === 'changeStatus' && (
                    <FormField label="New Status">
                      <Field name="status" as="select" className="w-full border-gray-300 rounded p-2">
                         <option value="intake">Intake</option>
                         <option value="triage">Triage</option>
                         <option value="evidence_needed">Evidence Needed</option>
                         <option value="appeal_ready">Appeal Ready</option>
                         <option value="submitted">Submitted</option>
                         <option value="pending_payer">Pending Payer</option>
                         <option value="won">Won</option>
                         <option value="lost">Lost</option>
                      </Field>
                    </FormField>
                )}
              </Form>
            </Formik>
          </CardBoxModal>



            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={`Case: ${cases.case_number || cases.id}`} main>
                <div className="flex gap-2">
                    <BaseButton color="info" label="Edit Case" href={`/cases/cases-edit/?id=${id}`} />
                </div>
            </SectionTitleLineWithButton>

            <div className="flex mb-4 gap-2 overflow-x-auto">
                {tabs.map(tab => (
                    <BaseButton
                        key={tab.id}
                        color={activeTab === tab.id ? 'info' : 'whiteDark'}
                        label={tab.label}
                        icon={tab.icon}
                        onClick={() => setActiveTab(tab.id)}
                    />
                ))}
            </div>

            {activeTab === 'overview' && (
<CardBox className="mb-6">
<h3 className="text-xl font-semibold mb-4">Command Actions</h3>
<div className="flex flex-wrap gap-2">
<BaseButton color="info" outline label="Assign Owner" href={'/cases/cases-edit/?id=' + id} />


<BaseButton color="info" outline label="Change Status" onClick={() => setModalAction('changeStatus')} />
<BaseButton color="success" outline label="Add Task" href={'/tasks/tasks-new?caseId=' + id} />
<BaseButton color="warning" outline label="Add Note" href={'/notes/notes-new?caseId=' + id} />
<BaseButton color="info" outline label="Upload Document" href={'/documents/documents-new?caseId=' + id} />
<BaseButton color="info" outline label="New Draft" href={'/appeal_drafts/appeal_drafts-new?caseId=' + id} />
<BaseButton color="success" label="Mark Won" onClick={() => setModalAction('markWon')} />
<BaseButton color="danger" label="Mark Lost" onClick={() => setModalAction('markLost')} />
{['won', 'lost'].includes(cases.status) && <BaseButton color="warning" label="Reopen Case" onClick={() => setModalAction('reopen')} />}

</div>
</CardBox>
)}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CardBox>
                        <h3 className="text-xl font-semibold mb-4">Patient Information</h3>
                        <div className="mb-2"><strong>Patient Name:</strong> {cases.patient_name}</div>
                        <div className="mb-2"><strong>Patient DOB:</strong> {cases.patient_dob ? new Date(cases.patient_dob).toLocaleDateString() : ''}</div>
                        <div className="mb-2"><strong>Member ID:</strong> {cases.member_id}</div>
                        <div className="mb-2"><strong>Facility Name:</strong> {cases.facility_name}</div>
                        <div className="mb-2"><strong>Ordering Provider:</strong> {cases.ordering_provider}</div>
                    </CardBox>
                    <CardBox>
                        <h3 className="text-xl font-semibold mb-4">Case Details</h3>
                        <div className="mb-2"><strong>Status:</strong> <span className="capitalize">{cases.status}</span></div>
                        <div className="mb-2"><strong>Priority:</strong> <span className="capitalize">{cases.priority}</span></div>
                        <div className="mb-2"><strong>Outcome:</strong> <span className="capitalize">{cases.outcome}</span></div>
                        <div className="mb-2"><strong>Amount at Risk:</strong> ${cases.amount_at_risk}</div>
                        <div className="mb-2"><strong>Procedure Code:</strong> {cases.procedure_code}</div>
                        <div className="mb-2"><strong>Diagnosis Code:</strong> {cases.diagnosis_code}</div>
                        <div className="mb-2"><strong>Denial Reason Code:</strong> {cases.denial_reason_code}</div>
                        <div className="mb-2"><strong>Denial Reason:</strong> {cases.denial_reason}</div>
                        <div className="mb-2"><strong>Payer:</strong> {cases.payer?.name}</div>
                        <div className="mb-2"><strong>Owner:</strong> {cases.owner_user?.firstName} {cases.owner_user?.lastName}</div>
                        <div className="mb-2"><strong>Due At:</strong> {cases.due_at ? new Date(cases.due_at).toLocaleString() : ''}</div>
                    </CardBox>
                </div>
            )}

            {activeTab === 'tasks' && (
                <CardBox>
                    <div className="mb-4">
                        <BaseButton color="info" label="Add Task" href={`/tasks/tasks-new?caseId=${id}`} />
                    </div>
                    <TableTasks filterItems={generateFixedFilter('case', cases.id)} setFilterItems={() => null} filters={[{title: 'case'}]} showGrid={true} />
                </CardBox>
            )}
            
            {activeTab === 'documents' && (
                <CardBox>
                    <div className="mb-4">
                        <BaseButton color="info" label="Upload Document" href={`/documents/documents-new?caseId=${id}`} />
                    </div>
                    <TableDocuments filterItems={generateFixedFilter('case', cases.id)} setFilterItems={() => null} filters={[{title: 'case'}]} showGrid={true} />
                </CardBox>
            )}

            {activeTab === 'drafts' && (
                <CardBox>
                    <div className="mb-4">
                        <BaseButton color="info" label="New Draft" href={`/appeal_drafts/appeal_drafts-new?caseId=${id}`} />
                    </div>
                    <TableAppealDrafts filterItems={generateFixedFilter('case', cases.id)} setFilterItems={() => null} filters={[{title: 'case'}]} showGrid={true} />
                </CardBox>
            )}

            {activeTab === 'notes' && (
                <CardBox>
                    <div className="mb-4">
                        <BaseButton color="info" label="Add Note" href={`/notes/notes-new?caseId=${id}`} />
                    </div>
                    <TableNotes filterItems={generateFixedFilter('case', cases.id)} setFilterItems={() => null} filters={[{title: 'case'}]} showGrid={true} />
                </CardBox>
            )}

            {activeTab === 'activity' && (
                <CardBox>
                    <TableActivityLogs filterItems={generateFixedFilter('case', cases.id)} setFilterItems={() => null} filters={[{title: 'case'}]} showGrid={true} />
                </CardBox>
            )}

          </SectionMain>
      </>
    )
}

CasesView.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated permission={'READ_CASES'}>
          {page}
      </LayoutAuthenticated>
  )
}

export default CasesView;
