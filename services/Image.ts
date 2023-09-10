
export class Image {

  static getFormData(files: File[]) {
    const formData = new FormData()

    files.map((file, index) => {
      formData.append(`file_${index + 1}`, file)
    })

    return formData
  }
}