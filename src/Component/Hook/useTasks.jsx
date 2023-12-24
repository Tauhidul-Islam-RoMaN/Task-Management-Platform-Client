import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useTasks = () => {
    const axiosPublic =useAxiosPublic()
    const {user} =useAuth()
    const {data : tasks = [], refetch} = useQuery({
        queryKey: ['tasks'],
        queryFn: async () =>{
            const result = await axiosPublic.get(`/tasks?email=${user?.email}`)
            return result.data
        }
    })
    return  [tasks, refetch]
};

export default useTasks;