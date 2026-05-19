<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TodoList</title>
</head>
<body>
    <h1>Edit Todo list with laravel</h1>

    @if($errors->any())
    @foreach($errors->all() as $error)
    <div>
        {{ $error }}
    </div>
    @endforeach
    @endif

    <form action="{{ route('todo.update', ['id' => $todo->id])  }}" method="POST">
        @method('PUT')
        @csrf
        <input value="{{ $todo->title }}" name="title" type="text">
        <br>
        <select name="is_completed" id="">
            <option {{ !$todo->is_completed ? 'selected' : ''  }} value="0">Pending</option>
            <option {{ $todo->is_completed ? 'selected' : ''  }} value="1">Completed</option>
        </select>
        <input type="submit" value="Edit Todo">
    </form>

</body>
</html>