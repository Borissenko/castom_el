function getCoordinates(): Promise<any> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export async function getGeolocation(): Promise<string[]> {
  if (navigator.geolocation)
    return await getCoordinates()
      .then((position: any) => ([position.coords.latitude, position.coords.longitude]))
  return Promise.resolve([])
}


