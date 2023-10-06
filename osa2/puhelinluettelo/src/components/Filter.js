const Filter = (props) => {
    return (
      <>
        filter shown with <input
          onChange={props.onChange}
          value={props.value}
        />
  
      </>
    )
  }


export default Filter