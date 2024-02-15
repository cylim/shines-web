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
import { getDoc, unsafeIdentity } from "@junobuild/core-peer";
import { HOST, SATELITE_ID } from "@/utils/env";
import { Avatar } from "@/utils/scheme";

type State = {
  active: string;
  total_button_presses: number;
};

const initialState = { active: "1", total_button_presses: 0 };

const reducer: FrameReducer<State> = (state, action) => {
  return {
    total_button_presses: state.total_button_presses + 1,
    active: action.postBody?.untrustedData.buttonIndex
      ? String(action.postBody?.untrustedData.buttonIndex)
      : "1",
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

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error("Invalid frame payload");
  }

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT
  const { id } = (params as any)
  const item = await getDoc< Avatar >({
    satellite: {
      identity: undefined,
      satelliteId: SATELITE_ID,
    },
    collection: "avatars",
    key: id
  })

  console.log("info: state is:", state);
  if (frameMessage) {
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

    console.log("info: frameMessage is:", frameMessage);
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
        postUrl="/frames/api"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage src={item?.data?.avatarUrl || ''} />
        <FrameInput text="Enter your prompts" />
        <FrameButton>
          {state?.active === "1" ? "Submit" : "Submitted"}
        </FrameButton>
        <FrameButton action="link" target={`${HOST}/avatars/${id}`}>
          View Prompts
        </FrameButton>
      </FrameContainer>
    </div>
  );
}