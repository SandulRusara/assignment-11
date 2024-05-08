/* navigation */

$('#customerPage').css('display', 'none');
$('#itemPage').css('display', 'none');
$('#orderPage').css('display', 'none');
$('#viewOrderDetailsPage').css('display', 'none');

$('#navbar-nav>a').eq(0).on("click", () =>{
    event.preventDefault();
    $('#homePage').css('display', 'block');
    $('#customerPage').css('display', 'none');
    $('#itemPage').css('display', 'none');
    $('#orderPage').css('display', 'none');
    $('#viewOrderDetailsPage').css('display', 'none');
});
$('#navbar-nav>a').eq(1).on("click", () =>{
    event.preventDefault();
    $('#customerPage').css('display', 'block');
    $('#homePage').css('display', 'none');
    $('#itemPage').css('display', 'none');
    $('#orderPage').css('display', 'none');
    $('#viewOrderDetailsPage').css('display', 'none');
});
$('#navbar-nav>a').eq(2).on("click", () =>{
    event.preventDefault();
    $('#itemPage').css('display', 'block');
    $('#customerPage').css('display', 'none');
    $('#homePage').css('display', 'none');
    $('#orderPage').css('display', 'none');
    $('#viewOrderDetailsPage').css('display', 'none');
});
$('#navbar-nav>a').eq(3).on("click", () =>{
    event.preventDefault();
    $('#orderPage').css('display', 'block');
    $('#itemPage').css('display', 'none');
    $('#customerPage').css('display', 'none');
    $('#homePage').css('display', 'none');
    $('#viewOrderDetailsPage').css('display', 'none');
});
$('#navbar-nav>a').eq(4).on("click", () =>{
    event.preventDefault();
    $('#viewOrderDetailsPage').css('display', 'block');
    $('#orderPage').css('display', 'none');
    $('#itemPage').css('display', 'none');
    $('#customerPage').css('display', 'none');
    $('#homePage').css('display', 'none');
});
