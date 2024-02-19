import { Video } from "@/utils/scheme";
import Image from "next/image";
import { useEffect, useState } from "react";
import { VideoScrollListItem } from "./VideoScrollListItem";
import { fakedata } from "@/utils/fakedata";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const VideoScrollList = () => {
  const [videos, setVideos] = useState(fakedata);

  useEffect(() => {
  }, []);

  // Function to update active section (you can add your logic here)
  const updateActiveSection = (index: number, section: HTMLElement, isBack: boolean = false) => {
    const sectionHeight = section.offsetHeight;
    let scrollToY = index * sectionHeight;
    if(isBack) {
      scrollToY = (index - 1 > 0 ? index - 1 : 0) * sectionHeight
    }
    console.log(`Entered section ${index + 1}, ${sectionHeight}, ${scrollToY}`);

    window.scrollTo({
      top: scrollToY,
      behavior: 'smooth'
    })
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: () => `+=${section.offsetHeight /2}`,
        onEnter: () => updateActiveSection(index, section),
        onEnterBack: () => updateActiveSection(index, section, true),
      });
    });

    return () => {
      // Clean up when the component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const renderItem = (item: Video, index: number) => {
    return <VideoScrollListItem key={item.id} item={item} index={index} />
  }

  return !videos.length ? <Image
    src="/shine.png"
    alt="Shine Logo"
    width={280}
    height={280}
    priority
  /> : <div id="scroll-container" className={'max-h-[calc(100vh - 148px)] min-h-[calc(100vh - 148px)] flex flex-col snap-y'}> 
     {videos.map(renderItem)}
  </div>
};

export default VideoScrollList;