import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/tasks/tasksSlice'
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


const TasksView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { tasks } = useAppSelector((state) => state.tasks)
    
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
              <title>{getPageTitle('View tasks')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View tasks')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/tasks/tasks-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
                {hasPermission(currentUser, 'READ_ORGANIZATIONS') && 
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Organization</p>
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{tasks?.organization?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                  } 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Case</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{tasks?.case?.case_number ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Assignee</p>
                    
                    
                        <p>{tasks?.assignee_user?.firstName ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Title</p>
                    <p>{tasks?.title}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={tasks?.description} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Status</p>
                    <p>{tasks?.status ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Priority</p>
                    <p>{tasks?.priority ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='DueAt'>
                    {tasks.due_at ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={tasks.due_at ?
                        new Date(
                          dayjs(tasks.due_at).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No DueAt</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='CompletedAt'>
                    {tasks.completed_at ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={tasks.completed_at ?
                        new Date(
                          dayjs(tasks.completed_at).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No CompletedAt</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/tasks/tasks-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

TasksView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_TASKS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default TasksView;