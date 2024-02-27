// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LendingContract {
    address public lender;
    address public borrower;
    uint256 public loanAmount;
    uint256 public interestRate;
    uint256 public dueDate;
    bool public loanRepaid;

    event LoanIssued(address indexed _lender, address indexed _borrower, uint256 _loanAmount, uint256 _interestRate, uint256 _dueDate);
    event LoanRepaid(address indexed _borrower, uint256 _repaidAmount);

    modifier onlyLender() {
        require(msg.sender == lender, "Only lender can call this function");
        _;
    }

    modifier onlyBorrower() {
        require(msg.sender == borrower, "Only borrower can call this function");
        _;
    }

    modifier loanNotRepaid() {
        require(!loanRepaid, "Loan has already been repaid");
        _;
    }

    constructor(address _borrower, uint256 _loanAmount, uint256 _interestRate, uint256 _dueDate) {
        lender = msg.sender;
        borrower = _borrower;
        loanAmount = _loanAmount;
        interestRate = _interestRate;
        //dueDate = _dueDate;
        dueDate = block.timestamp + (_dueDate*24*60*60); // Due date : after how many days ?  

        loanRepaid = false;

        emit LoanIssued(lender, borrower, loanAmount, interestRate, dueDate);
    }

    function repayLoan() external payable onlyBorrower loanNotRepaid {
        require(msg.value == calculateTotalAmount(), "Incorrect repayment amount");

        loanRepaid = true;

        //Transfer the repaid amount to the lender
        (bool success, ) = lender.call{value: msg.value}("");
        require(success, "Transfer to lender failed");

        emit LoanRepaid(borrower, msg.value);
    }

    function calculateTotalAmount() public view returns (uint256) {
        uint256 interest = (loanAmount * interestRate) / 100;
        return loanAmount + interest;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}