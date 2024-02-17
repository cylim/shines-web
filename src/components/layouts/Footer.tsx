import NextImage from 'next/image'

type ISocial = {
  name: string,
  url: string,
}

const social = [
  {
    name: 'Github',
    url: `https://github.com/cylim/shines-web`,
  },
  {
    name: 'DeSoc',
    url: `https://build.bewater.xyz/en/campaigns/HK6L-DeSoc-Hackathon-S1/projects/475`,
  },
] as const satisfies readonly ISocial[]

export const Footer = async () => {

  return <footer className={'py-6 relative flex flex-col items-center overflow-hidden px-2 lg:px-4'}>
    <div className={'flex flex-col items-center justify-center w-full relative z-10 gap-12 xl:max-w-7xl '}>
      <div className='flex flex-col justify-between items-center flex-wrap w-full gap-4'>
        <NextImage src={'/shine.png'} alt={'Shine logo'} width={64} height={64} />
        <div className={'flex flex-row gap-4'}>
          {social.map(s => <a key={s.name} href={s.url} target='_blank' rel="noopener">{s.name}</a>)}
        </div>
      </div>
    </div>

  </footer>
}

export default Footer