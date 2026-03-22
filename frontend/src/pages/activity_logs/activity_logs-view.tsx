import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/activity_logs/activity_logsSlice'
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


const Activity_logsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { activity_logs } = useAppSelector((state) => state.activity_logs)
    
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
              <title>{getPageTitle('View activity_logs')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View activity_logs')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/activity_logs/activity_logs-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
                {hasPermission(currentUser, 'READ_ORGANIZATIONS') && 
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Organization</p>
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{activity_logs?.organization?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                  } 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Case</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{activity_logs?.case?.case_number ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Actor</p>
                    
                    
                        <p>{activity_logs?.actor_user?.firstName ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>EntityType</p>
                    <p>{activity_logs?.entity_type ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>EntityKey</p>
                    <p>{activity_logs?.entity_key}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Action</p>
                    <p>{activity_logs?.action ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={activity_logs?.message} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='OccurredAt'>
                    {activity_logs.occurred_at ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={activity_logs.occurred_at ?
                        new Date(
                          dayjs(activity_logs.occurred_at).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No OccurredAt</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>IPAddress</p>
                    <p>{activity_logs?.ip_address}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/activity_logs/activity_logs-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

Activity_logsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_ACTIVITY_LOGS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default Activity_logsView;