"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({ params }) {

    const [interviewData, setInterviewData] = useState()
    const [webCamEnabled, setWebCamEnabled] = useState(false)

    useEffect(() => {
        console.log(params.interviewId)

        GetInterviewDetails()
    }, [])

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))

        console.log('#########', result)
        setInterviewData(result[0]);
    }
    useEffect(() => {
        console.log('Interview Data:', interviewData)
    }, [interviewData])

    return (
        <div className='my-10'>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className='flex flex-col my-5 gap-4'>
                    <div className='flex flex-col gap-4 p-5 rounded-lg border'>
                        <h2 className='text-lg'><strong>Job Role/Job Position: </strong>{interviewData?.jobPosition}</h2>
                        <h2 className='text-lg'><strong>Job Description: </strong>{interviewData?.jobDesc}</h2>
                        <h2 className='text-lg'><strong>Years Of Expeience: </strong>{interviewData?.jobExperience}</h2>
                    </div>
                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                        <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb /><strong>Information</strong></h2>
                        <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>
                <div>
                    {webCamEnabled ?
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(true)}
                            mirrored={true}
                            style={{
                                height: 300,
                                width: 300,
                            }}
                        /> :
                        <>
                            <WebcamIcon className='h-72 w-full my-7  p-20 bg-secondary rounded-lg border' />
                            <div className='flex gap-4 justify-between'>
                                <Button variant='outline' className="w-[75%]" onClick={() => setWebCamEnabled(true)}>Enable Webcam and Microphone</Button>
                                <Button className="w-[25%]">Start Interview</Button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Interview