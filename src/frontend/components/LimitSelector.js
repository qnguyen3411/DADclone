import React from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'reactstrap';
import { query } from '../constants/Submission';
import { setLimit } from '../actions/SubmissionsActions';
import { getLimit } from '../state/selectors/SubmissionsSelector';

const LimitSelector = ({ selectedLimit, optionClicked }) => {
  const activatedClass = "btn btn-dark";
  const deactivatedClass = "btn btn-outline-dark";
  const resolveClass = (btnVal) => 
    btnVal === selectedLimit ? activatedClass : deactivatedClass;
  
  return (
    <div className="d-flex pb-3">
      <p className="m-1 pt-1">Per page:</p>
      <ButtonGroup size="sm">
        {
          query.LIMIT_OPTIONS.map(option => (
            <Button 
              key={option} 
              onClick={optionClicked(option)}
              className={resolveClass(option)}>
              {option}
            </Button>
          ))
        }
      </ButtonGroup>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedLimit: getLimit(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  optionClicked: (val) => () => 
    val !== ownProps.selectedLimit && dispatch(setLimit(val))
})

export default connect(mapStateToProps, mapDispatchToProps)(LimitSelector);

