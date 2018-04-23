# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['TestAPI::test_users 1'] = {
    'data': {
        'users': {
            'edges': [
                {
                    'node': {
                        'id': 'VXNlcjox',
                        'name': 'Foo',
                        'posts': {
                            'edges': [
                                {
                                    'node': {
                                        'id': 'UG9zdDox',
                                        'title': 'Test'
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    }
}

snapshots['TestAPI::test_invalid_search 1'] = {
    'errors': [
        {
            'locations': [
                {
                    'column': 3,
                    'line': 1
                }
            ],
            'message': 'Field "post" of type "Post" must have a sub selection.'
        },
        {
            'locations': [
                {
                    'column': 3,
                    'line': 1
                }
            ],
            'message': 'Field "post" argument "id" of type "ID!" is required but not provided.'
        }
    ]
}

snapshots['TestAPI::test_posts 1'] = {
    'data': {
        'posts': {
            'edges': [
                {
                    'node': {
                        'author': {
                            'id': 'VXNlcjox',
                            'name': 'Foo'
                        },
                        'content': 'Test Content',
                        'id': 'UG9zdDox',
                        'title': 'Test'
                    }
                }
            ]
        }
    }
}

snapshots['TestAPI::test_post 1'] = {
    'data': {
        'post': {
            'author': {
                'id': 'VXNlcjox',
                'name': 'Foo'
            },
            'content': 'Test Content',
            'id': 'UG9zdDox',
            'title': 'Test'
        }
    }
}

snapshots['TestAPI::test_post_comment 1'] = {
    'data': {
        'post': {
            'comments': {
                'edges': [
                    {
                        'node': {
                            'author': {
                                'id': 'VXNlcjox',
                                'name': 'Foo'
                            },
                            'id': 'Q29tbWVudDox'
                        }
                    }
                ]
            },
            'content': 'Test Content',
            'id': 'UG9zdDox',
            'title': 'Test'
        }
    }
}

snapshots['TestAPI::test_login_fail 1'] = {
    'data': {
        'login': None
    },
    'errors': [
        {
            'locations': [
                {
                    'column': 12,
                    'line': 1
                }
            ],
            'message': 'Incorrect credentials'
        }
    ]
}

snapshots['TestAPI::test_login 1'] = {
    'data': {
        'login': {
            'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4cCI6LTIxNDY4NjcyMDB9.TJ5qA5aFbyh0t92NEhUcs9q2RmXf_mIsnvdZyKozqI4'
        }
    }
}
