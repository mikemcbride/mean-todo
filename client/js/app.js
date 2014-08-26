var app = angular.module('todoApp', []);

app.filter('doneFilter', [function() {
    return function(todos) {
        console.log(todos);
        var result = 0;
        for (var i = 0; i < todos.length; i++) {
            console.log(todos[i]);
            if (todos[i].done != true) {
                result++;
            }
        }

        return result;
    }
}]);
