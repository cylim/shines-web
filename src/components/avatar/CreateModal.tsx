'use client'
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react"
import { setDoc, uploadFile } from "@junobuild/core-peer";
import { Input } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { Avatar } from "@/utils/scheme";
import { ShineAPI } from "@/utils/apis/shine";

const locations = [
  {
    title: 'Beach',
    value: '1',
  },
  {
    title: 'Library',
    value: '2',
  },
  {
    title: 'Club',
    value: '3',
  },
]

export const CreateModal = () => {
  const [opened, setOpen] = useState(false)
  const [file, setFile] = useState<File | undefined>();
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [types, setTypes] = useState<any>(new Set([]))
  const { address } = useAccount();

  const reload = () => {
    let event = new Event("reloadAvatar");
    window.dispatchEvent(event);
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setFile(() => (event.target as HTMLInputElement).files?.[0] || undefined) 
  }

  const add = async () => {
    setLoading(true);

    try {
      if (!address) {
        throw new Error('No user or provider')
      }
      if (!file) {
        throw new Error('No file')
      }

      const key = `${address}-${+new Date()}`;

      toast.dismiss()
      toast.loading('Uploading image...')

      const { downloadUrl } = await uploadFile({
        collection: "resources",
        data: file,
        filename: `${key}-ori`,
      });

      toast.dismiss()
      toast.loading('Generating avatar...')

      const [type] = types
      let base64Img = undefined
      if (!!prompt) {
        base64Img = await ShineAPI.avatarWithPrompt({ prompt, file })
      } else {
        base64Img = await ShineAPI.avatarWithType({ file, type: type || '1' })
      }
      // const buffer = Buffer.from(res, 'binary')
      // const blob = new Blob([res], { type: 'image/png' });
      console.log(base64Img)

      // const avaFile = new File([blob], 'ava.png')
      // console.log(avaFile)

      toast.dismiss()
      toast.loading('Storing avatar for generative usage...')

      const { downloadUrl: url } = await uploadFile({
        collection: "resources",
        data: base64Img,
        filename: `${key}-avatar.png`,
      });

      await setDoc<Avatar>({
        collection: "avatars",
        doc: {
          key,
          data: {
            id: key,
            address: address || '',
            sourceUrl: downloadUrl,
            avatarUrl: url,
            prompt: prompt,
            type: type,
          },
        },
      });

      
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
            {!!file ? <Image src={URL.createObjectURL(file)} height={320} width={'auto'} /> : null}
            <Input
              variant={'faded'}
              key={`${address}-input`}
              id={`${address}-input`}
              name={`${address}-input`}
              type="file"
              onChange={handleUpload}
              accept="image/*"
            />
            <Input variant={'faded'} label="Prompt" placeholder="Enter your prompt for generating image" value={prompt} onValueChange={setPrompt} />
            <Select
              variant={'faded'}
              label="Location"
              placeholder="Select location"
              selectedKeys={types} onSelectionChange={setTypes}
            >
              {locations.map((c) => (
                <SelectItem key={c.value} value={c.value} textValue={c.title}>
                  <p>{c.title}</p>
                </SelectItem>
              ))}
            </Select>
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
