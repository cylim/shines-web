
'use client'
import {  Link } from "@nextui-org/react";
import { Video } from "@/utils/scheme";
import NextLink from 'next/link'

export const VideoListItem = ({ item }: { item: Video }) => {


  return <Link as={NextLink} href={`videos/${item.id}`}>
    <div className="flex flex-col gap-2 border-slate-500 border-1 p-2 rounded-xl">
      <div className="font-semibold text-2xl grow flex flex-row items-start">
        <video controls src={item.url} height={240} width={240} className={'max-h-[240px] max-w-[240px] min-h-[240px] min-w-[240px]'} />
      </div>

      <div className={'flex flex-col flex-wrap justify-center gap-2 items-center'}>
        {/* <Button radius="full" onClick={createVideo} color={'primary'} className="w-[220px]">Create</Button> */}
      </div>
    </div>

  </Link>
}