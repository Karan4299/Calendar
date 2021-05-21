


(()=>{
    let theme= true;

    const main_container = document.querySelector(".main_container");
    const eve_lst_doc = document.querySelector(".calender_frame .left .time_content div.event_lists div.event_lists_box");
    
    const current_time = new Date();
    let activeDate = current_time.getDate();
    let activeMonth = current_time.getMonth();
    let activeDay = current_time.getDay();
    let activeYear = current_time.getFullYear();
    
   let events = [];
    
    
    
    


    const getMonthCode = (d) => {
        const months = ["Jan", "Feb", "Mar" ,"Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        for(let i=0;i<months.length;i++){
            if(months[i]==d){
                return i;
            }
        }
    }

    const getDay = (m) => {
        const day = ["Sunday", "Monday", "Tuesday" ,"Wednesday", "Thursday", "Friday", "Saturday"];
        for(let i=0;i<day.length;i++){
            if(i==m){
                return day[i];
            }
        }
    }

    const left = document.querySelector(".left");

    const saveEvent = (event) => {
        const req= new Request("https://60a83a798532520017ae5b91.mockapi.io/",{
            method: 'POST',
             body: JSON.stringify(event),
             headers: {
                'Content-Type': 'application/json',
            }
        });
        
        fetch(req)
        .then((res)=>res.json())
        .then(data =>{
            events.push(data);
            left.querySelector(".time_content .create_event_form").classList.toggle("height_100");
            if(left.querySelector(".time_content .create_event_form .event_form").style.opacity=="1"){
                left.querySelector(".time_content .create_event_form .event_form").style.opacity="0";
            }else{
                left.querySelector(".time_content .create_event_form .event_form").style.opacity="1";
            
            }
        })
    }




    const form_btn = left.querySelector(".time_content .create_event_form .event_form form");
    form_btn
    .addEventListener("submit",function(event){
        event.preventDefault();
        const formdata = new FormData(form_btn);
        const newEvent = Array.from(formdata.entries()).reduce((accu, item) => {
            accu[item[0]] = item[1];
            return accu;
        }, {});
        saveEvent(newEvent);
    })


    const renderLeft = () =>{
        left.querySelector(".calender_frame .left .time_content div.Date").
        innerHTML = activeDate;
        console.log(activeDay);
        left.querySelector(".calender_frame .left .time_content div.Day").
        innerHTML = getDay(activeDay);
    }


    const right = document.querySelector(".right");

    const setYear = () => {
        right.querySelector(".year span").innerHTML = activeYear;
    }

    const setMonths = () => {
        const mn = right.querySelector(".mnths");
        mn.innerHTML="";
        const months = ["Jan", "Feb", "Mar" ,"Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

        months.forEach((item,i)=>{
            const ele = document.createElement("span");
            ele.innerHTML = item;
                
            if(i==activeMonth){
                ele.classList.add("active_ele");
            }
            mn.appendChild(ele);
        });
    }


    const setDates = () =>{
        const daysInCurrentMonth = 40 - new Date(activeYear,activeMonth,40).getDate();
        const daysinPrevMonth = 40 - new Date(activeYear,activeMonth-1,40).getDate();
        const firstDayOfTheMonth = new Date(activeYear,activeMonth).getDay();
        const daysinNextMonth = 42 -(firstDayOfTheMonth+daysInCurrentMonth);
    
        const prevMonth = Array(firstDayOfTheMonth).fill().map((data,i)=>daysinPrevMonth - firstDayOfTheMonth+1+i);
        const curMonth = Array(daysInCurrentMonth).fill().map((item,i)=>i+1);
        const nextMonth = Array(daysinNextMonth).fill().map((data,i)=>i+1);
    
        const daysOfMonth =[
            ...prevMonth,
            ...curMonth,
            ...nextMonth
        ];
    
        var dates = document.querySelector(".dates");
        dates.innerHTML="";
        let weekElement;
        daysOfMonth.forEach((date,i)=>{
            if(i%7===0){
                weekElement = document.createElement("div");
                weekElement.classList.add("week");
                dates.appendChild(weekElement);
            }
    
            const dateEle = document.createElement("span");
            if(i<firstDayOfTheMonth || i>=firstDayOfTheMonth+daysInCurrentMonth){
                dateEle.classList.add("grey");
            };
    
            if(date == current_time.getDate() && !dateEle.classList.contains("grey")){
                dateEle.classList.add("active_ele");
                if(!theme){
                    dateEle.classList.add("color_active_ele");
                }
            }
    
            if(!dateEle.classList.contains("grey") && date != current_time.getDate()){
                dateEle.classList.add("date_box");
            }
            dateEle.innerHTML = date;
            weekElement.appendChild(dateEle);
        });
    
    }


    
    right.querySelector(".year").addEventListener("click",function(event){
        if(event.target.nodeName === "I"){
            const yearEle =  right
            .querySelector(".year span");

            const pointer  =event.target.getAttribute("data-id");
            if(pointer === "left"){
                activeYear = Number(yearEle.innerHTML)-1;
                    
            }else{
                activeYear = Number(yearEle.innerHTML)+1;
            }
            yearEle.innerHTML = activeYear;
            setDates();
            renderLeft();
        }
    });

    right.querySelector(".mnths").addEventListener("click",function(event){
        if(event.target.nodeName == "SPAN"){
            if(theme){
                right.querySelector(".mnths span.active_ele").classList.remove("active_ele");
                event.target.classList.add("active_ele");
            }else{
                right.querySelector(".mnths span.active_ele").classList.remove("color_active_ele");
                right.querySelector(".mnths span.active_ele").classList.remove("active_ele");
                event.target.classList.add("active_ele");
                event.target.classList.add("color_active_ele");
                // right.querySelector(".dates .week span.active_ele").classList.add("color_active_ele");
                // right.querySelector(".dates .week span.active_ele").classList.remove("active_ele");
            }
            
            activeMonth = getMonthCode(event.target.innerHTML);
            activeDay = new Date(activeYear,activeMonth,activeDate).getDay();
            // console.log(activeYear, activeMonth ,activeDay);
            setDates();
            renderLeft();
        }
    });
    

    

    const setinitials = () => {

        const left = document.querySelector(".left");
        const right = document.querySelector(".right");
        
        main_container.querySelector(".contrast_circle").addEventListener("click",function(){
            main_container.classList.toggle("background_color");

            main_container.querySelector(".calender_frame").classList.toggle("calender_frame_white");
            main_container.querySelector(".calender_frame").classList.toggle("calender_frame_white_shadow");
            
            main_container.querySelector(".contrast_circle .theme_btn i").classList.toggle("rotate_img")
            main_container.querySelector(".contrast_circle").classList.toggle("calender_frame_white");

            main_container.querySelector(".calender_frame .left .left_back_green").classList.toggle("width_100");

            right.querySelector(".dates span.active_ele").classList.toggle("color_active_ele");

            right.querySelector(".mnths span.active_ele").classList.toggle("color_active_ele");
            theme=!theme;
        });
        

    

        left.querySelector(".time_content .event_lists .see_more").addEventListener("click",function(){
            // console.log(left.querySelector(".time_content div.event_lists div.event_lists_box").style.height);
            
            if(left.querySelector(".time_content div.event_lists .see_more").innerHTML==="See past events"){
                left.querySelector(".time_content div.event_lists .see_more").innerHTML="See recent event";
                display();
                console.log("Hello")
            }else if(left.querySelector(".time_content div.event_lists .see_more").innerHTML==="See recent event"){
                
                left.querySelector(".time_content div.event_lists .see_more").innerHTML="See past events";
                display(1);
            }
            
        });
        

        left.querySelector(".time_content .create_event i").addEventListener("click",function(){
            left.querySelector(".time_content .create_event_form").classList.toggle("height_100");
            if(left.querySelector(".time_content .create_event_form .event_form").style.opacity=="1"){
                left.querySelector(".time_content .create_event_form .event_form").style.opacity="0";
            }else{
                left.querySelector(".time_content .create_event_form .event_form").style.opacity="1";
            
            }
        });

        left.querySelector(".time_content .create_event_form .event_form .cancel i").addEventListener("click",function(){
            left.querySelector(".time_content .create_event_form").classList.toggle("height_100");
            if(left.querySelector(".time_content .create_event_form .event_form").style.opacity=="1"){
                left.querySelector(".time_content .create_event_form .event_form").style.opacity="0";
            }else{
                left.querySelector(".time_content .create_event_form .event_form").style.opacity="1";
            
            }
        })

        right.querySelector(".dates").addEventListener("click",function(event){
            console.log(event.target.nodeName);
            if(event.target.nodeName === "SPAN"
            && !event.target.classList.contains("grey")){
                left.querySelector(".calender_frame .left .time_content div.Date").innerHTML = event.target.innerHTML; 
                activeDate = event.target.innerHTML;
                left.querySelector(".calender_frame .left .time_content div.Day").innerHTML = new Date(activeYear,activeMonth,activeDate)
                .toLocaleString("default",{weekday:"long"});

                if(theme){
                    right.querySelector(".dates .week span.active_ele").classList.add("date_box");
                    right.querySelector(".dates .week span.active_ele").classList.remove("active_ele");
                    event.target.classList.add("active_ele");
                    right.querySelector(".dates .week span.active_ele").classList.remove("date_box");   
                }else{
                    right.querySelector(".dates .week span.active_ele").classList.add("date_box");
                    right.querySelector(".dates .week span.active_ele").classList.remove("active_ele");
                    event.target.classList.add("active_ele");
                    event.target.classList.add("color_active_ele");
                    right.querySelector(".dates .week span.active_ele").classList.remove("date_box"); 
                }
            }
        });

        
        
        
    }

    const display =(limit) =>{
        const ul = document.querySelector(".event_lists div.event_lists_box ul");
        ul.innerHTML="";
        const list = limit ? events.slice(0, limit) : events.slice();
        list.forEach((item,i)=>{
            
            const li = document.createElement("li");
            li.innerHTML=  item.event ;
            ul.appendChild(li);
        });
        eve_lst_doc.appendChild(ul);
    }

    const fetcheventdata = () =>{
        fetch("https://60a83a798532520017ae5b91.mockapi.io/")
        .then(res => res.json())
        .then(res => {
            events = res;
            display(1);
        })
        .finally(
            console.log("Displayed events")
        ) 
    }

    



    setinitials();
    renderLeft();
    fetcheventdata();
    setDates();
    setMonths();
    setYear();
})();





