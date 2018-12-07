import React from 'react';
import { connect } from 'react-redux';
import { GalleryRedirect } from '../GalleryLink';
import PhotoGallery from 'react-photo-gallery';
import Lightbox from 'react-images';

import { posterForSubmission } from '../../state/selectors/UsersSelector';

import LightboxSubmissionInfo from './LightboxSubmisisonInfo';

class Gallery extends React.Component {

  state = {
    userPageRedirect: null,
    index: null
  };

  constructor(props) {
    super(props);

    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrev = this.gotoPrev.bind(this);
    this.setUserPageRedirect = this.setUserPageRedirect.bind(this);
  }

  setUserPageRedirect() {
    this.setState({
      userPageRedirect: this.selectCurrImage().posterId
    })
  }

  openLightbox(event, obj) {
    this.setState({
      index: obj.index,
    });
  }

  closeLightbox() {
    this.setState({
      index: null,
    });
  }

  gotoPrev() {
    this.state.index !== null &&
      this.setState({
        index: this.state.index - 1,
      });
  }

  gotoNext() {
    this.state.index !== null &&
      this.setState({
        index: this.state.index + 1,
      });
  }

  selectDisplayItems() {
    return this.props.items.map(item => ({
      id: item.id,
      src: item.url,
      width: 1,
      height: 1,
    }))
  }

  selectCurrImage() {
    const index = this.state.index || 0;
    return this.props.items[index];
  }

  renderLightboxSubmissionInfo() {
    const image = this.selectCurrImage();
    return image ?
      <LightboxSubmissionInfo
        key="1"
        user={this.props.getPoster(image)}
        postedDate={image.createdAt}
        onClick={this.setUserPageRedirect.bind(this)}
      /> :
      null;
  }

  renderLightbox(items) {
    const { index } = this.state;
    const submissionInfo = this.renderLightboxSubmissionInfo();
    const lightBoxIsOpen = index !== null;

    return (
      <Lightbox images={items}
        isOpen={lightBoxIsOpen}
        currentImage={index}
        onClickNext={this.gotoNext}
        onClickPrev={this.gotoPrev}
        onClose={this.closeLightbox}
        customControls={[submissionInfo]}
        showImageCount={false}
      />
    )
  }

  renderGallery(items) {
    return (
      <PhotoGallery photos={items} onClick={this.openLightbox} />
    )
  }

  render() {
    if (this.state.userPageRedirect !== null) 
      return <GalleryRedirect userId={this.state.userPageRedirect} />;

    const displayItems = this.selectDisplayItems();

    return (
      <div className="col-10 mx-auto">
        {this.renderGallery(displayItems)}
        {this.renderLightbox(displayItems)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  getPoster: (submission) => posterForSubmission(state, submission),
});

export default connect(mapStateToProps)(Gallery);
