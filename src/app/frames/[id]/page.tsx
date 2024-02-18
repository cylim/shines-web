import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
  getFrameMessage,
} from "frames.js/next/server";
import Link from "next/link";
import { DEBUG_HUB_OPTIONS } from "@/utils/frame";
import { HOST } from "@/utils/env";
import { get, insertRow } from "@/utils/firebaseHelper";

type State = {
  active: boolean;
};

const initialState = { active: false };

const reducer: FrameReducer<State> = (state, action) => {
  return {
    active: true,
  };
};

// This is a react server component only
export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(searchParams);
  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    ...DEBUG_HUB_OPTIONS,
  });

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  const { id } = (params as any)
  const item = await get('avatars', [id as string])
  // console.log(item)

  // console.log("info: state is:", state);
  if (frameMessage) {
    // console.log("info: frameMessage is:", frameMessage);
    const {
      isValid,
      buttonIndex,
      inputText,
      castId,
      requesterFid,
      casterFollowsRequester,
      requesterFollowsCaster,
      likedCast,
      recastedCast,
      requesterVerifiedAddresses,
      requesterUserData,
    } = frameMessage;
    if (state.active && isValid && buttonIndex === 1 && !!inputText) {
      const key = `${requesterVerifiedAddresses?.[0] || 'undefined'}-${+new Date()}`
      await insertRow('prompts', [key], {
        id: key,
        content: inputText,
        address: requesterVerifiedAddresses?.[0],
        avatarPrompted: id,
        fid: requesterFid,
        userData: requesterUserData,
        ...requesterUserData
      })
    }
  }

  // then, when done, return next frame
  return (
    <div className="p-4">
      frames.js starter kit. The Template Frame is on this page, it&apos;s in
      the html meta tags (inspect source).{" "}
      <Link href={`/frames/debug?url=${HOST}/frames/${id}`} className="underline">
        Debug
      </Link>
      <FrameContainer
        pathname={`/frames/${id}`}
        postUrl={`/frames/api`}
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage aspectRatio="1:1">
          <div tw={`h-full w-full flex flex-col items-end justify-end bg-black bg-cover bg-center`} 
            style={{ backgroundImage: `url('${item?.sourceUrl || 'https://wrbih-aiaaa-aaaal-adofa-cai.icp0.io/resources/0x950911F03616a05d5A1F96E76F783fAdeb53778c-1707986926701-avatar.png'}')`, backgroundPosition: 'center', backgroundRepeat: 'repeat', backgroundSize: 'cover' }}
          >
            <div tw="bg-white w-full color-black px-4 py-2 text-5xl" >
              {!state?.active ? item?.description || 'Help me to generate new prompt! Tips might given to the best prompt!' : 'Thanks for submitting the prompt!'}
            </div>
          </div>
        </FrameImage>
        <FrameInput text="Enter your prompts" />
        <FrameButton action={"post"}>
          {!state?.active ? "Submit" : "Submitted"}
        </FrameButton>
        <FrameButton action="link" target={`${HOST}/avatars/${id}`}>
          View Prompts
        </FrameButton>
      </FrameContainer>
    </div>
  );
}