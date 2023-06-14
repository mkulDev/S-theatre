import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com',
    prepareHeaders: headers => {
      headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY)
      return headers
    },
  }),
  endpoints: builder => ({
    getTopCharts: builder.query({
      query: () => '/v1/charts/world',
    }),
    getSongDetails: builder.query({
      query: songid => `/v1/tracks/details?track_id=${songid}`,
    }),
    getRelatedSongs: builder.query({
      query: songid => `/v1/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: id => `v2/artists/details?artist_id=${id}`,
    }),
    getSongsByCountry: builder.query({
      query: country => {
        if (!country) {
          return { skip: true }
        }

        return `/v1/charts/country?country_code=${country}`
      },
    }),
    getSongsByGenre: builder.query({
      query: genre => `/v1/charts/genre-world?genre_code=${genre}`,
    }),
    getSearchSong: builder.query({
      query: searchPhrase => `/v1/search/multi?query=${searchPhrase}&search_type=SONGS`,
    }),
  }),
})

//export hooks
// remember const {use+endpointName+Query}
export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetRelatedSongsQuery, useGetArtistDetailsQuery, useGetSongsByCountryQuery, useGetSongsByGenreQuery, useGetSearchSongQuery } = shazamCoreApi
