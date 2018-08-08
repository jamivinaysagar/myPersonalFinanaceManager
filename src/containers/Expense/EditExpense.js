import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import * as actions from '../../actions'
import api from '../../api'
import ExpenseFieldsCard from '../../components/Expense/ExpenseFieldsCard'

class EditExpense extends React.Component {
  componentWillMount() {
    console.log("Props value is :::: " +this.props)
    this.props.getExpense(this.props.match.params.expenseId)
  }

  handleSubmit = (values) => {
    console.log(values)
    //converting into datatime format
    values.expenseDate = new Date(values.expenseDate)
    api.post('/expense/edit', values)
      .then(res => {
        console.log(res)
        if(res.status === 200)
          this.props.history.push('/expense/all')
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <Row>
        <Col>
          <div className="m-t-10">
            <ExpenseFieldsCard title="Edit Expense"
                              submitName="Update"
                              initialValues={this.props.expenseEditData}
                              onSubmit={this.handleSubmit}>
            </ExpenseFieldsCard>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  expenseEditData: state.expenseReducer.expenseEditData
})

const mapDispatchToProps = dispatch => ({
  getExpense: (expenseId) => {
    dispatch(actions.getExpense(expenseId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps) (EditExpense)