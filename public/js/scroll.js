//collect items to make arrangements
const targets  =document.querySelectorAll('.target');

//view standart
const options={
    threshold:0.3
};

// entries auto by intersection-
const callBack=(entries)=>{
    entries.forEach((element) => {
        if(element.isIntersecting){                     //.isIntersecting is in IntersectionObserver
            element.target.classList.add('active');      //intersection obj has target option
        }  
        else{
            element.target.classList.remove('active');
        }
    });
};

//items is protected, we can arrange views with interse-
const observer = new IntersectionObserver(callBack,options);

targets.forEach((target)=>{
    observer.observe(target);
});

