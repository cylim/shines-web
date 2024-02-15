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
import { getDoc, setDoc } from "@junobuild/core-peer";
import { HOST, SATELITE_ID } from "@/utils/env";
import { Avatar, Prompt } from "@/utils/scheme";

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
  const item = await getDoc<Avatar>({
    satellite: {
      identity: undefined,
      satelliteId: SATELITE_ID,
    },
    collection: "avatars",
    key: id
  })

  console.log("info: state is:", state);
  if (frameMessage) {
    console.log("info: frameMessage is:", frameMessage);
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
      await setDoc<Prompt>({
        satellite: {
          identity: undefined,
          satelliteId: SATELITE_ID,
        },
        collection: "prompts",
        doc: {
          key: `${requesterVerifiedAddresses}?.[0]-${+new Date()}`,
          data: {
            content: inputText,
            address: requesterVerifiedAddresses?.[0],
            avatarPrompted: id,
            fid: requesterFid,
            userData: requesterUserData
          }
        }
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
        {!state?.active ? <FrameImage src={item?.data?.avatarUrl || ''} /> : <FrameImage>
          <div tw="w-full h-full bg-slate-700 text-white justify-center items-center">
            Submitted
          </div>
        </FrameImage> }
        <FrameInput text="Enter your prompts" />
        <FrameButton action="post">
          {!state?.active ? "Submit" : "Submitted"}
        </FrameButton>
        <FrameButton action="link" target={`${HOST}/avatars/${id}`}>
          View Prompts
        </FrameButton>
      </FrameContainer>
    </div>
  );
}