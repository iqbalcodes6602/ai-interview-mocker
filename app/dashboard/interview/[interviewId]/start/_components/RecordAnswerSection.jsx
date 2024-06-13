import { Button } from '@/components/ui/button'
import { Mic } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam'

function RecordAnswerSection() {

    const [userAnswer, setUserAnswer] = useState('')

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => (
            setUserAnswer(prevAns => prevAns + result?.transcript)
        ))
    }, [results])

    return (
        <div className='flex flex-col justify-center items-center'>

            <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
                <Image src={'/webcam.png'} width={200} height={200} className="absolute" alt="microphone" />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10
                    }}
                />
            </div>

            <div className='flex my-10 gap-10'>
                <Button
                    variant="outline"
                    onClick={isRecording ? stopSpeechToText : startSpeechToText}
                >
                    {
                        isRecording ?
                            'Record Answer'
                            :
                            <h2 className='text-red-600 flex gap-2'>
                                <Mic size={20} /> Stop Recording...
                            </h2>
                    }
                </Button>

                <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
            </div>
        </div>
    )
}

export default RecordAnswerSection