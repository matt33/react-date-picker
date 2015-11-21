var React = require("react");
var CalendarUtil = require("../utils/CalendarUtil");
var Calendar = require("./Calendar");

var Datepicker = React.createClass({
	getInitialState: function() {
		var date = this.props.displayMonth || this.props.selectedDate || new Date();
		var selectedDate = this.props.selectedDate;
		var selectedMonth = date.getMonth();
		var selectedYear = date.getFullYear();
		var monthDays = CalendarUtil.calendar(new Date(date.getTime()));
		var months = this.props.monthLabels || ["January", "February", "March", "April", "May", 
						"June", "July", "August", "September", "October", 
						"November", "December"];
		var minimumDate = this.props.minimumDate;
		minimumDate.setHours(0);
		minimumDate.setMinutes(0);
		minimumDate.setSeconds(0);
		minimumDate.setMilliseconds(0)

		return {
				monthDays: monthDays,
				selectedYear: selectedYear,
				selectedMonth: selectedMonth,
				selectedDay: selectedDate,
				monthLabels: months,
				minimumDate: minimumDate
			 	};
	},
	changeMonth: function(direction) {
		var month = this.state.selectedMonth;
		var year = this.state.selectedYear;	
		if(direction == 1) {
			month += 1;
			if(month > 11) {
				month %= 12;
				year += 1;
			}
		}
		if(direction == -1) {
			month -= 1;
			if(month < 0) {
				month += 12;
				year -= 1;
			}
		}
		
		var newState = {
				selectedMonth: month,
				selectedYear: year,
				monthDays: CalendarUtil.calendar(new Date(year, month))
			 	};
		this.setState(newState);
	},
	changeYear: function(direction) {
		var year = this.state.selectedYear + direction;
		var month = this.state.selectedMonth;
		var newState = {
				selectedMonth: month,
				selectedYear: year,
				monthDays: CalendarUtil.calendar(new Date(year, month))
			 	};
		this.setState(newState);
	},
	onChange: function(day) {
		this.setState({ selectedDay: day });
		if(!!this.props.onChange) { this.props.onChange(day); }
	},
	render: function() {
		var selectedDateLabel = 'DD/MM/YYYY'; 
		if(!!this.state.selectedDay) {
			selectedDateLabel = this.state.selectedDay.getDate() + "/" +
								(this.state.selectedMonth + 1) + "/" +
								this.state.selectedYear;
		}
		return (<div className="datepicker">
					<div className="header">
						<div>{selectedDateLabel}</div>

						<div>
							<div className="prev" onClick={this.changeYear.bind(null, -1)}>prev</div>
							Year: {this.state.selectedYear}
							<div className="next" onClick={this.changeYear.bind(null, 1)}>next</div>
						</div>

						<div>
							<div className="prev" onClick={this.changeMonth.bind(null, -1)}>prev</div>
							{this.state.monthLabels[this.state.selectedMonth]}
							<div className="next" onClick={this.changeMonth.bind(null, 1)}>next</div>
						</div>
					</div>
					<Calendar minimumDate={this.state.minimumDate} onChange={this.onChange} selectedDay={this.state.selectedDay} dates={this.state.monthDays} selectedMonth={this.state.selectedMonth} />
				</div>);
	}
})

module.exports = Datepicker;  