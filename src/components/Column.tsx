type Props = {
  key: number
  type: string
  value: string
}

const Column = (props: Props) => {
  // console.log(props)
  const renderColumn = (type: string) => {
    switch (type) {
      case "text": {
        return <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="flex items-center">
            <div className="max-w-[150px] truncate text-sm font-medium text-gray-900">
              {props.value}
            </div>
          </div>
        </td>
      }
  
      case "img": {
        return <td className="px-6 py-4 whitespace-nowrap">
          <img className="w-[120px]" src={props.value}/>
        </td>
      }
  
      case "description": {
        return <td className="px-6 py-4 whitespace-nowrap">
          <span className="min-w-[100px] max-w-[120px] truncate px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
            {props.value}
          </span>
        </td>
      }
  
      default: {
        return <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="flex items-center">
            <div className="min-w-[60px] max-w-[120px] truncate text-sm font-medium text-gray-900">
              {props.value}
            </div>
          </div>
        </td>
      }
    }
  }
  return renderColumn(props.type)
}

export default Column