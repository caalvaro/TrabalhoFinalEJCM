<?php

use Illuminate\Database\Seeder;

class PostTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts')->insert([
            'content' => 'Eae galerinha!',
            'user_id' => 2
        ]);
        DB::table('posts')->insert([
            'content' => 'Colé Lucas!!',
            'user_id' => 3
        ]);
    }
}
