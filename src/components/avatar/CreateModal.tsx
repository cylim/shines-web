'use client'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { setDoc, uploadFile } from "@junobuild/core-peer";
import { Input } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { Avatar } from "@/utils/scheme";

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
  const [valid, setValid] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [types, setTypes] = useState<any>(new Set([]))
  const { address } = useAccount();

  useEffect(() => {
    const [type] = types

    setValid(
      (!!prompt || !!type) && !!address && !!file
    );
  }, [prompt, types, address, file]);

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
        return
      }

      const key = `${address}-${+new Date()}`;

      toast('Uploading image')
      const { downloadUrl } = await uploadFile({
        collection: "images",
        data: file,
        filename: key,
      });

      toast('Generating avatar')


      const url = ""


      const [type] = types
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

      toast(`Created`)
      setOpen(false);
      reload();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  if (!address) {
    return null
  }

  return <>
    <div className="mt-10 flex items-center justify-center gap-x-6">
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
      <ModalContent className="border-0 border-transparent ">
        <ModalHeader className="flex flex-col" >
          <h3 className="text-center text-xl text-white/50 font-bold">New Challenge!</h3>
        </ModalHeader>
        <ModalBody>
          <div className="py-16 flex flex-col gap-4">
            <Input variant={'faded'} label="Prompt" placeholder="Enter your prompt for generating image"  value={prompt} onValueChange={setPrompt} />
            <Select
              variant={'faded'}
              label="Location"
              placeholder="Select location"
              isRequired selectedKeys={types} onSelectionChange={setTypes}
            >
              {locations.map((c) => (
                <SelectItem key={c.value} value={c.value} textValue={c.title}>
                  <p>{c.title}</p>
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="modal-terms">
            <Button radius="full" onClick={add} isLoading={loading} isDisabled={!valid} color="primary" className="primary-button">
              Create
            </Button>
            <Button radius="full" onClick={() => setOpen(false)} className="primary-button bg-none !animate-none !transition-none !bg-[#272727] !mt-4">Cancel</Button>
          </div>
        </ModalBody>
        {/* <ModalFooter className="flex flex-col text-center w-full">
          <h2>What Happens?</h2>
          <p className="terms-conditions">Donation to charity if failed to complete on time.</p>
          <p className="terms-conditions">Complete the challenge within deadline to earn some points!</p>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  </>
}

export default CreateModal

export const MemoizedCreateModal = React.memo(CreateModal);
