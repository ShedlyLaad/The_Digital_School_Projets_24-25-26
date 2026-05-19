<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TodoList1</title>
</head>
<body>
    <h1>Todo-List With Laravel</h1>
    @if ($errors->any())
    @foreach($errors->all() as $error)
    <div>
        {{ $error }}
    </div>
    @endforeach
    @endif
    @if (session()->has('success'))
    <div>
        {{ session()->get('success') }}
        </div>
        @endif


    <form action="" method="POST">
        @csrf
        <input type="text" name ="title" placeholder="Add todo title">
        <br>
        <input type="submit" value="Add Todo">
    </form>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @if($todos)
            @foreach($todos as $todo)
                <tr>
                    <td>{{ $todo->id }}</td>
                    <td>{{ $todo->title }}</td>
                    <td>
                        @if($todo->is_completed)
                        Completed
                        @else
                        Pending
                        @endif
                    </td>
                    <td>
                        <a href="{{ route('todo.edit', ['id' => $todo->id ]) }}">Edit</a>
                        <a href="{{ route('todo.destroy', ['id' => $todo->id ] ) }}">Delete</a>
                    </td>
                </tr>
                </td>
            </tr>
            @endforeach
            @endif
        </tbody>
    </table>
</body>
</html>