import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import * as actions from '../../actions'
import api from '../../api'
import SearchBar from '../../components/SearchBar'
import ExpenseCard from '../../components/Expense/ExpenseCard'
import DeleteModal from '../../components/DeleteModal'

class SearchExpense extends React.Component {
  constructor(props) {
    super(props)
    console.log("Constructor Params :: "+this.props.expense.expenseList)
    this.state = {
      expenseDeleteModal: false,
      deleteExpenseId: '',
      items:this.props.expense.expenseList
      
    }
  }

  filterList =  (values) => {
    var updatedList = this.props.expense.expenseList
    console.log("this.props.expense.expenseList >>> "+this.props.expense.expenseList);
    if(values.search!==undefined){
        updatedList = updatedList.filter(item => {
            //if(isNaN(values.search)){
                var eachExpenseName = item.expense_name.toLowerCase()
                var eachExpenseType = item.expense_type.toLowerCase()
                var eachExpenseAmount = item.expense_amount
                console.log("eachExpenseAmount :: "+eachExpenseAmount);
                var searchVal = values.search.toLowerCase()
                var filterVal = false
                if((eachExpenseName.search(searchVal)!== -1)||(eachExpenseType.search(searchVal)!== -1)){
                    filterVal = true;
                }
            //}
            
            return filterVal;
        });
    
    }
    
    this.setState({items: updatedList});
  }

  componentWillMount() {
    //Dispatching get all action
    this.props.getExpenseList()
    //console.log("this.props.expense.expenseList>>>>>> :::"+this.props.expense.expenseList);
    //this.setState({ items: this.props.expense.expenseList })
  }

  toggle = () => {
    this.setState({
      expenseDeleteModal: !this.state.ExpenseDeleteModal
    })
  }

  handleGetExpenseId = (expenseId) => {
    this.setState({
      expenseDeleteModal: true,
      deleteExpenseId: expenseId
    })
  }

  handleDelete = () => {
    this.setState({
      expenseDeleteModal: false
    })
    api.delete(`/expense/delete/${this.state.deleteExpenseId}`)
      .then(res => {
        console.log(res)
        if(res.status === 200)
          this.props.getExpenseList()
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleSubmit = (values) => {
    console.log(values)
    this.props.searchExpense(values.search)
  }

  render() {
    return (
      <Row>
        <Col>
          <div className="block-search">
            <SearchBar placeholder="search Expense..."
                       onSubmit={this.handleSubmit}
                       onChange={this.filterList}>
            </SearchBar>
          </div>
          <div className="block-content">
            {this.props.expense.expenseList.map(expense => {
              return <ExpenseCard key={expense.expense_id}
                                 expense={expense}
                                 match={this.props.match}
                                 getExpenseId={this.handleGetExpenseId}>
                      </ExpenseCard>
            })}
          </div>
        </Col>
        <DeleteModal modalState={this.state.expenseDeleteModal}
                     modalToggle={this.toggle}
                     modalAction={this.handleDelete}
                     modalTitle="Delete Expense"
                     modalBody="Are you sure you want to delete?">
        </DeleteModal>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  expense: state.expenseReducer,
  filterExpense : state.expenseReducer
})

const mapDispatchToProps = dispatch => ({
  getExpenseList: () => dispatch(actions.getAllExpense()),
  searchExpense: (expenseKey) => dispatch(actions.searchExpense(expenseKey))
})

export default connect(mapStateToProps, mapDispatchToProps) (SearchExpense)