'use client'
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@nextui-org/react"
import React, { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { insertRow, upload } from "@/utils/firebaseHelper";
import { useDropzone } from 'react-dropzone';
import { useSearchParams } from "next/navigation";

export const CreateModal = () => {
  const params = useSearchParams()
  const [opened, setOpen] = useState(!!params.get('avatar'))
  const [file, setFile] = useState<File | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("")
  const { address } = useAccount();
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    const open = !!params.get('avatar')
    setOpen(open)
  }, [params])

  const onDrop = useCallback((acceptedFiles: any) => {
    const image = acceptedFiles[0];
    setFile(image)
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader?.result);
    };
    reader.readAsDataURL(image);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: false,
  });

  const reload = () => {
    let event = new Event("reloadAvatar");
    window.dispatchEvent(event);
  };

  const add = async () => {
    setLoading(true);

    try {
      if (!address) {
        throw new Error('No user or provider')
      }
      if (!file) {
        throw new Error('No image selected')
      }
      
      toast.dismiss()
      toast.loading('Uploading image...')
      const key = `${address}-${+new Date()}`;
      const url = await upload(`${key}-ori`, file)

      toast.dismiss()
      toast.loading('Storing avatar for generative usage...')

      await insertRow('avatars', [key], {
        id: key,
        address: address || '',
        sourceUrl: url,
        description: description,
      })

      setTimeout(() => {
        toast.dismiss()
        toast.success(`Created`)
        setOpen(false);

        reload();
      }, 1000)
    } catch (err: any) {
      toast.dismiss()
      toast.error(err.message)
      console.error(err);
    }
    setLoading(false);
  };

  if (!address) {
    return null
  }

  return <>
    <div className="mt-10 flex items-center justify-center gap-x-6 w-48">
      <Button
        onClick={() => setOpen(true)}
        className="primary-button"
      >
        Add Avatar
      </Button>
    </div>
    <Modal isOpen={opened} onOpenChange={setOpen} scrollBehavior={'outside'} backdrop={'blur'} onClose={() => setOpen(false)} hideCloseButton classNames={{
      backdrop: "bg-gradient-to-t from-zinc-950 to-zinc-950/10 backdrop-opacity-100 brightness-50 backdrop-blur-md",
      base: "bg-transparent max-w-lg shadow-none",
    }}>
      <ModalContent className="border-0 border-transparent min-h-screen">
        <ModalHeader className="flex flex-col" >
          <h3 className="text-center text-xl text-white/50 font-bold">Generate new avatar!</h3>
        </ModalHeader>
        <ModalBody>
          <div className="py-16 flex flex-col gap-4 items-center">
            <div {...getRootProps()} className="flex max-w-full dropzone text-center border-dashed border-2 border-gray-600 p-8 rounded-md">
              <input {...getInputProps()} />
              {selectedImage ? (
                <Image src={selectedImage} alt="Selected" className="max-w-full rounded-md" />
              ) : <p className="text-white">Drag n drop an image here, or click to select one</p>}
            </div>
            <Textarea variant={'faded'} label="Prompt" isRequired placeholder="Enter your prompt for generating image" value={description} minRows={5} onValueChange={setDescription} />
          </div>
          <div className="modal-terms">
            <Button radius="full" onClick={add} isLoading={loading} color="primary" className="primary-button">
              {loading ? 'Generating' : 'Upload & Create'}
            </Button>
            <Button radius="full" onClick={() => setOpen(false)} className="primary-button bg-none !animate-none !transition-none !bg-[#272727] !mt-4">Cancel</Button>
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col text-center w-full">
          <h2>What Happens?</h2>
          <p className="terms-conditions">Upload your images.</p>
          <p className="terms-conditions">We will generate new avatar with the location or prompt!</p>
          <p className="terms-conditions">Use your avatar as your online presence!</p>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export default CreateModal

export const MemoizedCreateModal = React.memo(CreateModal);
