<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todolist;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todolist::all();
        return view('todo/todo-home', compact('todos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:8|alpha:ascii'
        ]);
        if ($validator->fails()) {
            return redirect('/')->withErrors($validator);
            } 
       $todo = new Todolist();
       $todo->title = $request->get('title');
       $todo->save();
       return"Succes" ;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $todo =Todolist::where('id',$id)->first();
        return view('todo/todo-edit', compact('todo'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:8|alpha:ascii'
        ]);
        if ($validator->fails()) {
            return redirect('/')->withErrors($validator);
            } 
            $todo = Todolist::where('id',$id)->first();
            $todo->title = $request->get('title');
            $todo->is_completed = $request->get('is_completed');
            $todo->save(); 
            return redirect()->route('todo.index')->with('success', 'Todo modified successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Todolist::where('id',$id)->delete();
        return redirect()->route('todo.index')->with('success','Todo deleted');
    }
}
