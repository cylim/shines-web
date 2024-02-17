import { random } from "./random"

export const redpandas = [
    {
      type: 'gif',
      url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3pxbDJhcnRhdzU3NWlyamhjMDU4bWtuNXJlczRnbnU4NDRxanAxaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/HUPc3ijS4WyRO/giphy.gif',
    },
    {
      url: 'https://player.vimeo.com/external/353539377.sd.mp4?s=fa4823ac540c8484ddbbcd6b0f8e9128fd2887f5&profile_id=165&oauth2_token_id=57447761'
    },
    {
      url: 'https://player.vimeo.com/external/403300964.hd.mp4?s=f6c127bea65cfbbe922e1be8c325948213cbc36e&profile_id=174&oauth2_token_id=57447761'
    },
    {
      url: 'https://player.vimeo.com/external/464508537.sd.mp4?s=206f33573237e20f260d4474ec6ce2957ed9ae8e&profile_id=165&oauth2_token_id=57447761'
    },
    {
      type: 'gif',
      url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3pxbDJhcnRhdzU3NWlyamhjMDU4bWtuNXJlczRnbnU4NDRxanAxaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6AaLzOaCyIGIM/giphy.gif',
    },
    {
      type: 'gif',
      url: 'https://media.giphy.com/media/oP9nClYkgxAac/giphy.gif?cid=790b7611czql2artaw575irjhc058mkn5res4gnu844qjp1h&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    },
    {
      type: 'gif',
      url: 'https://media.giphy.com/media/r7Nbr97FsXxXG/giphy.gif?cid=790b7611czql2artaw575irjhc058mkn5res4gnu844qjp1h&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    },
    {
      type: 'gif',
      url: 'https://media.giphy.com/media/H6VSByAkTsrTO/giphy.gif?cid=ecf05e47g8526mas4xp7daz0elz67tdyj63gqs6yk72mfai7&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    },
    {
      type: 'gif',
      url: 'https://media.giphy.com/media/C7fmS6fdWfrSU/giphy.gif?cid=ecf05e47g8526mas4xp7daz0elz67tdyj63gqs6yk72mfai7&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    },
    {
      type: 'gif',
      url: 'https://media.giphy.com/media/H3BHvv0oAhvdC/giphy.gif?cid=ecf05e47g8526mas4xp7daz0elz67tdyj63gqs6yk72mfai7&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    },
    {
      type: 'gif',
      url: 'https://media.giphy.com/media/fC4vvkZZNX1Tfnuxzt/giphy.gif?cid=ecf05e475a52mqpikqobvq64x570oamabbh6sewy5sk69j74&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    },
    {
      type: 'gif',
      url: 'https://media.giphy.com/media/B2vEpMV8XZjkeYqJWL/giphy.gif?cid=ecf05e47hrv2jua0vyr016mq7jcbcf9s3sagum6bk0g5tdq3&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    },
    {
      type: 'gif',
      url: 'https://media.giphy.com/media/kgou3f8dplvskJuZkl/giphy.gif?cid=ecf05e47hrv2jua0vyr016mq7jcbcf9s3sagum6bk0g5tdq3&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    },
  ]

export const fakedata = redpandas.map((r, i) => ({...r, address: `0x00000000000000000${random()}`, timestamp: { seconds: Math.floor(+new Date() / 1000)}, id: String(i)}))