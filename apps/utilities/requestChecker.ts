/* eslint-disable array-callback-return */
interface RequestCheckerAtributes {
  requireList: string[]
  requestData: any
}

export const RequestChecker = ({
  requireList,
  requestData
}: RequestCheckerAtributes): string => {
  const emptyfield: string[] = []

  requireList.map((value: string): void => {
    if (requestData[value] === undefined) {
      emptyfield.push(value)
    }
  })
  return emptyfield.toString()
}
