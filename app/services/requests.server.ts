// import * as C from "~/utils/constants"
import { pickFields, getModelUrl } from "~/utils/helpers.server"

import type * as PT from '../types/pocketbase-types'
import { pb } from './pocketbase.server'

export async function fetchSiteMap() {
  return Promise.all([
    pb.collection('episodes').getFullList<{
      id: string
      created: string
      updated: string
    }>({
      fields: pickFields(['id', 'created', 'updated']),
      sort: '-updated',
      skipTotal: true
    }),
    pb.collection('speakers').getFullList<{
      id: string
      created: string
      updated: string
    }>({
      fields: pickFields(['id', 'created', 'updated']),
      sort: '-updated',
      skipTotal: true
    }),
  ])
}

export async function fetchEpisodes() {
  const response = await pb.collection('episodes').getFullList<
    PT.EpisodesResponse & {
      expand: {
        speakers: PT.SpeakersResponse
      }
    }
  >({
    expand: 'speakers',
    sort: '-date'
  })

  return response.map(({ image, expand, ...episode }) => ({
    ...episode,
    imageUrl: getModelUrl({ model: episode, field: image }),
    speakers: expand.speakers
  }))
}