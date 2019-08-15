<?php

use Illuminate\Database\Seeder;

class CommentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('comments')->insert([
            'content' => 'Fala , Tanaka , um oi do PH!',
            'user_id' => 1,
            'post_id' => 1
        ]);
        DB::table('comments')->insert([
            'content' => 'Eae Álvaro, tanaka aqui!!',
            'user_id' => 2,
            'post_id' => 2
        ]);
    }
}
