import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast"

const useGeneratePodcast = ({
  setAudio, voiceType, voicePrompt, setAudioStorageId
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast()

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  
  const getPodcastAudio = useAction(api.openai.generateAudioAction)

  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio('');

    if(!voicePrompt) {
      toast({
        title: "Please provide a voiceType to generate a podcast",
      })
      return setIsGenerating(false);
    }

    if (voicePrompt.length > 4096) {
      toast({
        title: "Text is too long",
        description: "Please shorten it to 4096 characters or fewer.",
        variant: 'destructive',
      })
      return setIsGenerating(false);
    }

    try {
  const response = await getPodcastAudio({
    voice: voiceType,
    input: voicePrompt
  });

  const blob = new Blob([response], { type: 'audio/mpeg' });
  const fileName = `podcast-${uuidv4()}.mp3`;
  const file = new File([blob], fileName, { type: 'audio/mpeg' });

  // Convex upload
  // 1. Get upload URL from Convex
const uploadUrl = await generateUploadUrl();

// 2. Upload file to Convex storage
const uploadRes = await fetch(uploadUrl, {
  method: "POST",
  headers: { "Content-Type": file.type },
  body: file,
});

// 3. Extract storageId
const { storageId } = await uploadRes.json();


  setAudioStorageId(storageId);

  const audioUrl = await getAudioUrl({ storageId });
  setAudio(audioUrl!);

  setIsGenerating(false);
  toast({ title: "Podcast generated successfully" });
} catch (error) {
  console.log('Error generating podcast', error);
  toast({
    title: "Error creating a podcast",
    variant: 'destructive',
  });
  setIsGenerating(false);
}


  }

  return { isGenerating, generatePodcast }
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to generate Podcast
        </Label>
        <Textarea 
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder='Provide text to generate audio'
          rows={5}
          maxLength={4096}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
      <Button type="button" className="text-16 bg-orange-1 py-4 font-bold text-white-1" onClick={generatePodcast}>
        {isGenerating ? (
          <>
            Generating
            <Loader size={20} className="animate-spin ml-2" />
          </>
        ) : (
          'Generate'
        )}
      </Button>
      </div>
      {props.audio && (
        <audio 
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GeneratePodcast