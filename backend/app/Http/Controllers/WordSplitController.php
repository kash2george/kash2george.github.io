<?php

namespace App\Http\Controllers;

use App\Models\WordSplit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WordSplitController extends Controller
{
    public function split(Request $request)
    {
        $data = $request->validate([
            'word' => 'required|string',
        ]);

        $word = $data['word'];
        $length = strlen($word);
        $min = intdiv($length, 3);
        $remainder = $length % 3;

        $part1Len = $min + ($remainder > 0 ? 1 : 0);
        $part3Len = $min + ($remainder > 1 ? 1 : 0);
        $part2Len = $length - ($part1Len + $part3Len);

        $parts = [
            'part1' => substr($word, 0, $part1Len),
            'part2' => substr($word, $part1Len, $part2Len),
            'part3' => substr($word, $part1Len + $part2Len),
        ];

        $split = WordSplit::create([
            'user_id' => $request->user()->id,
            'word' => $word,
            'part1' => $parts['part1'],
            'part2' => $parts['part2'],
            'part3' => $parts['part3'],
        ]);

        return response()->json($split);
    }

    public function history(Request $request)
    {
        return response()->json(
            WordSplit::where('user_id', $request->user()->id)->latest()->get()
        );
    }
}
