import * as fflate from 'fflate'

// Accept Uint8Array or ArrayBuffer, return Uint8Array
export async function compress(
  data: Uint8Array | ArrayBuffer
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    try {
      const input = data instanceof Uint8Array ? data : new Uint8Array(data)
      const compressedData = fflate.deflateSync(input)
      resolve(compressedData)
    } catch (error) {
      reject(error)
    }
  })
}

export async function decompress(
  compressedData: Uint8Array | ArrayBuffer
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    try {
      const input =
        compressedData instanceof Uint8Array
          ? compressedData
          : new Uint8Array(compressedData)
      const decompressedData = fflate.inflateSync(input)
      resolve(decompressedData)
    } catch (error) {
      reject(error)
    }
  })
}
