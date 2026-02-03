import { http, delay, HttpResponse } from 'msw'

type Entity = { id: number | string }

export const crudHandlers = <T extends Entity>(collection: () => T[], endpoint: string) => {
  const collectionUrl = endpoint
  const elementUrl = `${endpoint}/:id`

  return [

    http.get<{ id: string }>(collectionUrl, async () => {
      console.log('[GET]', collectionUrl, ':', collection(), '\n')

      return HttpResponse.json(collection())
    }),

    http.get<{ id: string }>(elementUrl, async ({ params }) => {
      const element = collection().find(element => String(element.id) === params.id)

      console.log('[GET]', `${collectionUrl}/${params.id}`, ':', element, '\n')
      return HttpResponse.json(element)
    }),

    http.post(collectionUrl, async ({ request }) => {
      await delay(300)

      const payload = await request.clone().json()
      const element = { id: collection().length + 1, ...payload }

      collection().push(element)

      console.log('[POST]', collectionUrl, '\n[PAYLOAD]', payload, '\n[NEW STATE]:', collection(), '\n')
      return HttpResponse.json(element)
    }),

    http.put<{ id: string }>(elementUrl, async ({ request, params }) => {
      await delay(300)

      const payload = await request.clone().json()

      const current = collection().find(element => String(element.id) === params.id)
      const updated = { ...current, ...payload }

      const index = collection().findIndex(inCollection => String(inCollection.id) === params.id)
      collection().splice(index, 1, updated)

      console.log('[PUT]', `${collectionUrl}/${params.id}`, '\n[PAYLOAD]:', payload, '\n[NEW STATE]:', collection(), '\n')
      return HttpResponse.json(updated)
    }),

    http.delete<{ id: string }>(elementUrl, async ({ params }) => {
      await delay(300)

      const index = collection().findIndex(inCollection => String(inCollection.id) === params.id)
      collection().splice(index, 1)

      console.log('[DELETE]', `${collectionUrl}/${params.id}`, '\n[NEW STATE]:', collection(), '\n')
      return new HttpResponse(null, { status: 204 })
    }),
  ]
}