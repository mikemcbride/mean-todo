app.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.resetItem = function() {
        $scope.newItem = {
            text: '',
            done: false
        }
    }

    $scope.resetItem();

    // when first loading, go get all todos
    $http.get('/api/todo')
        .success(function (data) {
            $scope.todos = data;
            console.log('our data is: ', $scope.todos);
        })
        .error(function (data) {
            console.log('Error:', data);
        });

    $scope.addTodo = function() {
        $http.post('/api/todo', $scope.newItem)
            .success(function (data) {
                $scope.resetItem();
                $scope.todos.push(data);
            })
            .error(function (data) {
                console.log('Error:', data);
            });
    }

    $scope.deleteTodo = function(id) {
        $http.delete('/api/todo/' + id)
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function (data) {
				console.log('Error: ', data);
			});
    }

    $scope.updateTodo = function(todo) {
        $http.put('/api/todo/' + todo._id, todo)
            .success(function(data) {
                // do nothing, we aren't returning the object.
            })
            .error(function (data) {
                console.log('Error', data);
            });
    }


}]);
