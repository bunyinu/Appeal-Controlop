import * as icon from '@mdi/js';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { ReactElement } from 'react';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/SectionMain';
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton';
import CardBox from '../components/CardBox';
import { getPageTitle } from '../config';
import { useAppSelector } from '../stores/hooks';

const AppealDashboard = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const [stats, setStats] = useState({ openCases: 0, overdueCases: 0, amountAtRisk: 0, inAppeal: 0 });

    useEffect(() => {
        if (!currentUser) return;
        
        // Fetch scoped data
        const fetchData = async () => {
            try {
                // Fetch stats - note: this needs to be supported by backend
                // Reusing existing count endpoint or a new one
                const res = await axios.get('/cases/count'); 
                setStats({ openCases: res.data.count, overdueCases: 0, amountAtRisk: 0, inAppeal: 0 });
            } catch (e) {
                console.error("Failed to load dashboard stats", e);
            }
        };
        fetchData();
    }, [currentUser]);

    return (
        <>
            <Head><title>{getPageTitle('Appeal Dashboard')}</title></Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={icon.mdiChartTimelineVariant} title='Appeal Control Dashboard' main />
                
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6'>
                    <CardBox>
                        <div className='text-gray-500'>Open Cases</div>
                        <div className='text-3xl font-bold'>{stats.openCases}</div>
                    </CardBox>
                    <CardBox>
                        <div className='text-gray-500'>Overdue Cases</div>
                        <div className='text-3xl font-bold text-red-500'>{stats.overdueCases}</div>
                    </CardBox>
                    <CardBox>
                        <div className='text-gray-500'>Amount at Risk</div>
                        <div className='text-3xl font-bold'>${stats.amountAtRisk.toLocaleString()}</div>
                    </CardBox>
                    <CardBox>
                        <div className='text-gray-500'>In Appeal</div>
                        <div className='text-3xl font-bold'>{stats.inAppeal}</div>
                    </CardBox>
                </div>
            </SectionMain>
        </>
    );
};

AppealDashboard.getLayout = (page: ReactElement) => <LayoutAuthenticated>{page}</LayoutAuthenticated>;
export default AppealDashboard;
