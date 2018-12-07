import React from "react";

export default class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentDidMount() {
    this.previewFile(this.props.file);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) { return; }
    if(this.props.file === nextProps.file) { return; }
    this.previewFile(nextProps.file);
  }

  previewFile(file) {
    this.setState({ loading: true }, () => {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };
      reader.readAsDataURL(file);
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) { return null; }

    if (loading) { return <p>loading...</p>; }
    
    return (<img src={thumb}
      alt={file.name}
      className="img-thumbnail"
      height={300}
      width={300} />);
  }
}