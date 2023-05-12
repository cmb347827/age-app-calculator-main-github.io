'use strict'; 

const colors ={
	'White': 'hsl(0, 0%, 100%)',
	'Lighter Gray': 'hsl(11, 2%, 95%)',
	'Purple': 'hsl(259, 100%, 65%)',
	'Light red': 'hsl(0, 100%, 67%)',
	'Off black': 'hsl(0, 0%, 8%)',
};

$(window).resize(function(){
	location.reload();
});

const data ={
	day : document.getElementById('day'),
	month : document.getElementById('month'),
	year : document.getElementById('year'),
	error_day : document.getElementById('error-day'),
	error_month : document.getElementById('error-month'),
	error_year : document.getElementById('error-year'),
	years : document.getElementById('years'),
    months: document.getElementById('months'),
	days : document.getElementById('days'),
	number_years : document.getElementById('number-years'),
	number_months: document.getElementById('number-months'),
	number_days: document.getElementById('number-days'),
	days_per_month: [31,28,31,30,31,30,31,31,30,31,30,31],
}
const today = {
	date : new Date(),
	currentYear : function(){
		return this.date.getFullYear();
	},
	currentMonth: function(){
		//getMonth() returns a month between 0-11 , so add 1.
		return (this.date.getMonth()) + 1;
	},
	currentDate: function(){
		return this.date.getDate();
	}
}
let check_day = function(){
	data.day.style.border = '1px solid hsl(0, 0%, 8%)';
	data.error_day.style.color = colors['Off black'];
	data.error_day.textContent=``;
	if(data.day.value < 1 || data.day.value > 31){
	   //The day value entered is invalid
	   data.day.style.border = '1px solid hsl(0, 100%, 67%)';
	   data.error_day.style.color = colors['Light red'];
	   data.error_day.textContent = `Must be a valid day`;
	   return false;
	}
	return true;
};
let check_month = function(){
	data.month.style.border = '1px solid hsl(0, 0%, 8%)';
	data.error_month.style.color = colors['Off black'];
	data.error_month.textContent=``;
	if(data.month.value<1 || data.month.value > 12){
		//The month value entered is invalid
		data.month.style.border = '1px solid hsl(0, 100%, 67%)';
	    data.error_month.style.color = colors['Light red'];
		data.error_month.textContent=`Must be a valid month`;
		return false;
	}
	return true;
};
let check_year = function(){
	data.year.style.border = '1px solid hsl(0, 0%, 8%)';
	data.error_year.style.color = colors['Off black'];
	data.error_year.textContent=``;
	if(data.year.value < 1900){
		//the year value entered is invalid
		//taken extreme values for year, can be as old as 123 to months old.
		data.year.style.border = '1px solid hsl(0, 100%, 67%)';
	    data.error_year.style.color = colors['Light red'];
		data.error_year.textContent = `Year is too far in the past`;
		return false;
	}else if(year.value > 2023){
		//the year value entered is invalid is in the future.
		data.year.style.border = '1px solid hsl(0, 100%, 67%)';
	    data.error_year.style.color = colors['Light red'];
		data.error_year.textContent = `Must be in the past`;
		return false;
	}
	return true;
};

let correctDay_withMonth = function(){
	//februay : 28 days
	//january,march,may, july , august, october, and december 31 days
    //april, june, september, and november 30 days.
	//console.log('in correctDay_withMonth');
	data.error_day.style.color = colors['Off black'];
	data.error_day.textContent=``;
	if(data.month.value==='2'){
		//first check february + day
		//checks for leap year
        let isLeapYear= checkLeapYear(data.year.value);	
		//tetenary test for leapyear, set number of days to bypass error messaging.
        let num = isLeapYear ? 29 : 28;	
		
		if(data.day.value <1 || data.day.value>num){
			data.day.style.border = '1px solid hsl(0, 100%, 67%)';
	        data.error_day.style.color = colors['Light red'];
			data.error_day.textContent= `Must be a valid date`;
			return false;
		}
		return true;
	}
	if(data.month.value==='1' || data.month.value==='3' || data.month.value==='5' || data.month.value==='7' || data.month.value==='8' || data.month.value==='10' || data.month.value==='12'){
		//day can't be larger than 31 or smaller than 1
		if(data.day.value <1 || data.day.value>31){
			data.day.style.border = '1px solid hsl(0, 100%, 67%)';
	        data.error_day.style.color = colors['Light red'];
			data.error_day.textContent= `Must be a valid date`;
			return false;
		}
		return true;
	}
    if(data.month.value==='4' || data.month.value==='6' || data.month.value==='9' || data.month.value==='11'){
		//day can't be larger than 30 or smaller than 1
		if(data.day.value <1 || data.day.value>30){
			data.day.style.border = '1px solid hsl(0, 100%, 67%)';
	        data.error_day.style.color = colors['Light red'];
			data.error_day.textContent= `Must be a valid date`;
			return false;
		}
		return true;
	}
};

let getYears = function(){
	data.years.style.display ='none';
    data.number_years.style.display = 'block';
    data.number_years.style.color = colors['Purple'];
	$('#number-years').animate({fontSize: '2.2em'}, "slow");
	//I could combine these in just two expressions, but for readability have used four
	if(data.month.value < today.currentMonth()){
	    //birthday has been, calculate years 
	    data.number_years.textContent = today.currentYear() - Number(data.year.value);
	} else if(data.month.value > today.currentMonth()) {
	    //birthday month is still to come from current month. Calculate years: 
	    data.number_years.textContent = (today.currentYear() - Number(data.year.value)) - 1;
	} else if((data.month.value === (today.currentMonth().toString())) && (today.currentDate() > data.day.value)){
		//currentMonth is the same as birthday month, birthday has been
		data.number_years.textContent = today.currentYear() - Number(data.year.value);
	} else if((data.month.value === (today.currentMonth().toString())) && (today.currentDate() < data.day.value)){
		//currentMonth is the same as birthday month, birthday is still to come
		data.number_years.textContent = (today.currentYear() - Number(data.year.value)) - 1;
	}
}
let getMonths = function(){
	data.months.style.display ='none';
    data.number_months.style.display = 'block';
    data.number_months.style.color = colors['Purple'];
	$('#number-months').animate({fontSize: '2.2em'}, "slow");
	if(data.month.value < today.currentMonth()){
		//birthday has been, get number of months in between birthday month and currentmonth.
		const temp = today.currentMonth()- data.month.value - 1; //-1 as current month is not finished
		if(temp === 0){
			//with temp === 0 it means the birthday was last month.
			//if today's date is past birthday month date,then a month has passed since birthday.
			if(today.currentDate() >= data.day.value){
				data.number_months.textContent = '1';
				return true;
			}
		}
		//with temp being the number of whole months, count days to see if they add up to enough days to add a month.
		//count from birthday month's birthday till end of that month, and the days this month.
		let days = (data.days_per_month[Number(data.month.value-1)] - Number(data.day.value)) + today.currentDate();
		if(days >= 28){
			//enough days to add another month to total months
			data.number_months.textContent = temp + 1;
			return true;
	    }
		//not enough days to add another month, just set to temp
		data.number_months.textContent = temp;
	}else if(data.month.value > today.currentMonth()) {
		//birthday is still in a future month, get number of months in between birthday month and currentmonth.
		const temp = data.month.value - today.currentMonth(); 
		if(temp=== 1){
			//birthday is next month.
			if(today.currentDate() >= data.day.value){   
			    //and is less than a month away , set months to 11 (from last year's birthday month next month and up until now).
				data.number_months.textContent= '11';
				return true;
			}
		}
		//count number of months from birthday till the end of last year.
		let monthsFromBirthday = 12 - Number(data.month.value);
		//get number of whole months
		let monthsThisYear = today.currentMonth() -1;
		//add up the days from the last year's birthday month till end of month(from birthday) and the number of days this months.
		let days = (data.days_per_month[Number(data.month.value-1)] - Number(data.day.value)) + today.currentDate();
		if(days >= 28){
			//add another month
			data.number_months.textContent= monthsFromBirthday + monthsThisYear +1;
			return true;
		}
		data.number_months.textContent = monthsFromBirthday + monthsThisYear;
	}else if(data.month.value === (today.currentMonth().toString())){
		//birthday is this month.
		if(Number(data.day.value) > today.currentDate()){
			//reached 11 months at today.currentDate(),birthday still to come.
			data.number_months.textContent = '11';
	    } else{
			//birthday has been
			data.number_months.textContent = '0';
		}
	}
}
function checkLeapYear(year) {
    //three conditions to find out the leap year
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return true;
    } else {
        return false;
    }
}
let getDays = function(){
	let isLeap = checkLeapYear(Number(data.year.value));
	data.days.style.display ='none';
    data.number_days.style.display = 'block';
    data.number_days.style.color = colors['Purple'];
	$('#number-days').animate({fontSize: '2.2em'}, "slow");
	if(data.month.value !== today.currentMonth().toString()){
		//birthday is not this month.
		if(isLeap && (data.month.value==='2')){
			//birthday is leap year and february.
			let days = (29 - Number(data.day.value)) + today.currentDate();
			if(days >= 29){
			   //number of days is more than 29, 1 will be added in getMonths() so -29 here.
			   data.number_days.textContent = days - 29 +1;//plus 1 for birthday itself
		       return true;
		    }
			data.number_days.textContent = days + 1; //plus 1 for birthday itself
		}else{
			//same as above 
		    let days = (data.days_per_month[Number(data.month.value-1)] - Number(data.day.value)) + today.currentDate();
		    if(days >= data.days_per_month[Number(data.month.value-1)]){
			   data.number_days.textContent = days - data.days_per_month[Number(data.month.value-1)] ;
		       return true;
		    }
			data.number_days.textContent = days ;  
		}
		
	} else if(data.month.value === (today.currentMonth().toString())){
		//birthday is this month.
		if(Number(data.day.value) > today.currentDate()){
	      //birthday is to come still
		  data.number_days.textContent = data.days_per_month[Number(data.month.value-1)] - (Number(data.day.value) - today.currentDate());
		} else {
		  //birthday has been.
		  data.number_days.textContent = today.currentDate() - Number(data.day.value);
		}
	}
}

$(window).on('load',function(){
	 let dayOke = false;
	 let monthOke = false;
	 let yearOke = false;
	 let dayMonthOke = false;
	 
	 
	 //Any or all of the input fields' values has changed.
     [...document.querySelectorAll('input')].forEach(function(item) {item.addEventListener('change', function() {
		 //All input fields error checking.
		 if(data.day.value.length >0){
			 //The day input field has changed.
			 dayOke = check_day();
		 }
		 if(data.day.value.length > 0 && data.month.value.length >=1){
			 //Either the day or month have changed and now both have changed.
			 monthOke = check_month();
			 dayMonthOke = correctDay_withMonth();
		 }
		 if(data.year.value.length > 0){
			 //the year value has changed.
			 yearOke = check_year();
		 }
		 
	     });	 
	 });
	 
	 document.getElementById('get-age').addEventListener('click',function(){
		 //Check for any empty fields
		 if(data.day.value.length <=0){
			 data.day.style.border = '1px solid hsl(0, 100%, 67%)';
	         data.error_day.style.color = colors['Light red'];
			 data.error_day.textContent=`This field is required`;
		 }if(data.month.value.length <=0){
			 data.month.style.border = '1px solid hsl(0, 100%, 67%)';
	         data.error_month.style.color = colors['Light red'];
			 data.error_month.textContent=`This field is required`;
		 }if(data.year.value.length <=0){
			 data.year.style.border = '1px solid hsl(0, 100%, 67%)';
	         data.error_year.style.color = colors['Light red'];
			 data.error_year.textContent=`This field is required`;
		 }
		 if(dayOke && monthOke && dayMonthOke && yearOke){
			 //all error checking returns no errors, display the age.
             getYears();
			 getMonths();
			 getDays();
			 
		 }
	 });
	 
});
