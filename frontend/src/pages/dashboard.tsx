import * as icon from '@mdi/js';
import Head from 'next/head'
import React from 'react'
import axios from 'axios';
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import BaseIcon from "../components/BaseIcon";
import { getPageTitle } from '../config'
import Link from "next/link";

import { hasPermission } from "../helpers/userPermissions";
import { fetchWidgets } from '../stores/roles/rolesSlice';
import { WidgetCreator } from '../components/WidgetCreator/WidgetCreator';
import { SmartWidget } from '../components/SmartWidget/SmartWidget';

import { useAppDispatch, useAppSelector } from '../stores/hooks';
const Dashboard = () => {
    const dispatch = useAppDispatch();
    const iconsColor = useAppSelector((state) => state.style.iconsColor);
    const corners = useAppSelector((state) => state.style.corners);
    const cardsStyle = useAppSelector((state) => state.style.cardsStyle);

    const loadingMessage = 'Loading...';

    
    const [users, setUsers] = React.useState(loadingMessage);
    const [roles, setRoles] = React.useState(loadingMessage);
    const [permissions, setPermissions] = React.useState(loadingMessage);
    const [organizations, setOrganizations] = React.useState(loadingMessage);
    const [payers, setPayers] = React.useState(loadingMessage);
    const [cases, setCases] = React.useState(loadingMessage);
    const [tasks, setTasks] = React.useState(loadingMessage);
    const [documents, setDocuments] = React.useState(loadingMessage);
    const [appeal_drafts, setAppeal_drafts] = React.useState(loadingMessage);
    const [notes, setNotes] = React.useState(loadingMessage);
    const [activity_logs, setActivity_logs] = React.useState(loadingMessage);
    const [settings, setSettings] = React.useState(loadingMessage);

    
    const [widgetsRole, setWidgetsRole] = React.useState({
        role: { value: '', label: '' },
    });
    const { currentUser } = useAppSelector((state) => state.auth);
    const { isFetchingQuery } = useAppSelector((state) => state.openAi);
    
    const { rolesWidgets, loading } = useAppSelector((state) => state.roles);
    
    
    const organizationId = currentUser?.organizations?.id;
    
    async function loadData() {
        const entities = ['users','roles','permissions','organizations','payers','cases','tasks','documents','appeal_drafts','notes','activity_logs','settings',];
        const fns = [setUsers,setRoles,setPermissions,setOrganizations,setPayers,setCases,setTasks,setDocuments,setAppeal_drafts,setNotes,setActivity_logs,setSettings,];

        const requests = entities.map((entity, index) => {
          
          if(hasPermission(currentUser, `READ_${entity.toUpperCase()}`)) {
            return axios.get(`/${entity.toLowerCase()}/count`);
          } else {
            fns[index](null);
            return Promise.resolve({data: {count: null}});
          }
          
        });

        Promise.allSettled(requests).then((results) => {
            results.forEach((result, i) => {
                if (result.status === 'fulfilled') {
                    fns[i](result.value.data.count);
                } else {
                    fns[i](result.reason.message);
                }
            });
        });
    }
  
    async function getWidgets(roleId) {
        await dispatch(fetchWidgets(roleId));
    }
    React.useEffect(() => {
        if (!currentUser) return;
        loadData().then();
        setWidgetsRole({ role: { value: currentUser?.app_role?.id, label: currentUser?.app_role?.name } });
    }, [currentUser]);

    React.useEffect(() => {
        if (!currentUser || !widgetsRole?.role?.value) return;
        getWidgets(widgetsRole?.role?.value || '').then();
    }, [widgetsRole?.role?.value]);
  
  return (
    <>
      <Head>
        <title>
            {getPageTitle('Overview')}
        </title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
            icon={icon.mdiChartTimelineVariant}
            title='Overview'
            main>
          {''}
        </SectionTitleLineWithButton>
        
        {hasPermission(currentUser, 'CREATE_ROLES') && <WidgetCreator
            currentUser={currentUser}
            isFetchingQuery={isFetchingQuery}
            setWidgetsRole={setWidgetsRole}
            widgetsRole={widgetsRole}
        />}
        {!!rolesWidgets.length &&
            hasPermission(currentUser, 'CREATE_ROLES') && (
                <p className='  text-gray-500 dark:text-gray-400 mb-4'>
                    {`${widgetsRole?.role?.label || 'Users'}'s widgets`}
                </p>
            )}

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6 grid-flow-dense'>
            {(isFetchingQuery || loading) && (
                <div className={` ${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 text-lg leading-tight   text-gray-500 flex items-center ${cardsStyle} dark:border-dark-700 p-6`}>
                    <BaseIcon
                        className={`${iconsColor} animate-spin mr-5`}
                        w='w-16'
                        h='h-16'
                        size={48}
                        path={icon.mdiLoading}
                    />{' '}
                    Loading widgets...
                </div>
            )}

            { rolesWidgets &&
                rolesWidgets.map((widget) => (
                    <SmartWidget
                        key={widget.id}
                        userId={currentUser?.id}
                        widget={widget}
                        roleId={widgetsRole?.role?.value || ''}
                        admin={hasPermission(currentUser, 'CREATE_ROLES')}
                    />
            ))}
        </div>

        {!!rolesWidgets.length && <hr className='my-6  ' />}
        
        <div id="dashboard" className='grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6'>
        
          
            {hasPermission(currentUser, 'READ_USERS') && <Link href={'/users/users-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Users
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {users}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={icon.mdiAccountGroup || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_ROLES') && <Link href={'/roles/roles-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Roles
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {roles}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={icon.mdiShieldAccountVariantOutline || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_PERMISSIONS') && <Link href={'/permissions/permissions-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Permissions
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {permissions}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={icon.mdiShieldAccountOutline || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_ORGANIZATIONS') && <Link href={'/organizations/organizations-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Organizations
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {organizations}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_PAYERS') && <Link href={'/payers/payers-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Payers
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {payers}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiBank' in icon ? icon['mdiBank' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_CASES') && <Link href={'/cases/cases-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Cases
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {cases}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiBriefcase' in icon ? icon['mdiBriefcase' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_TASKS') && <Link href={'/tasks/tasks-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Tasks
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {tasks}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiClipboardCheck' in icon ? icon['mdiClipboardCheck' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_DOCUMENTS') && <Link href={'/documents/documents-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Documents
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {documents}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiFileDocumentMultiple' in icon ? icon['mdiFileDocumentMultiple' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_APPEAL_DRAFTS') && <Link href={'/appeal_drafts/appeal_drafts-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Appeal drafts
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {appeal_drafts}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiFileEdit' in icon ? icon['mdiFileEdit' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_NOTES') && <Link href={'/notes/notes-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Notes
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {notes}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiNoteText' in icon ? icon['mdiNoteText' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_ACTIVITY_LOGS') && <Link href={'/activity_logs/activity_logs-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Activity logs
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {activity_logs}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiHistory' in icon ? icon['mdiHistory' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_SETTINGS') && <Link href={'/settings/settings-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Settings
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {settings}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiCog' in icon ? icon['mdiCog' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
          
        </div>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
