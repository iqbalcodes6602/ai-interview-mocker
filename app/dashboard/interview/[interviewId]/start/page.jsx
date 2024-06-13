"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionsSections from './_components/QuestionsSections'
import RecordAnswerSection from './_components/RecordAnswerSection'

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState()
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState()
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

  useEffect(() => {
    GetInterviewDetails()
  }, [])

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))

    console.log('#########', result)
    setInterviewData(result[0]);

    const jsonMockResp = JSON.parse(result[0].jsonMockResp)
    setMockInterviewQuestions(jsonMockResp)
    console.log('jsonMockResp:', jsonMockResp)
  }

  return (
    <div>
      <div className='grid gird-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions */}
        <QuestionsSections
          activeQuestionIndex={activeQuestionIndex}
          mockInterviewQuestions={mockInterviewQuestions}
        />

        {/* video/ audio recording */}
        <RecordAnswerSection />
      </div>
    </div>
  )
}

export default StartInterview