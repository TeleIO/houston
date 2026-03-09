# Monkey-patch Psych for Ruby >= 3.1 compatibility with nanoc 3.x.
# Nanoc 3 uses YAML merge keys (<<: *alias). Ruby >= 3.1 raises
# Psych::AliasesNotEnabled unless aliases are explicitly enabled.
# We patch the visitor to allow aliases unconditionally.
if RUBY_VERSION >= '3.1'
  require 'yaml'

  module Psych
    module Visitors
      class NoAliasRuby < ToRuby
        def visit_Psych_Nodes_Alias(o)
          register(o, @st.fetch(o.anchor) {
            raise Psych::BadAlias, "Unknown alias: #{o.anchor}"
          })
        end
      end
    end
  end
end
